import React from 'react';
import { useSelector } from 'react-redux';
import { itemListAction, RootState } from 'store';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { dbService } from 'fbase';
import * as S from './styles';

type Props = {
    userId: string;
    userTitle: string;
    currentUserUid: string;
};

const RequestDltBtn = (props: Props) => {
    const dispatch = useDispatch();
    const { userId, userTitle } = props;
    const router = useRouter();
    const idTitle = { userId: userId, userTitle: userTitle };
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    const handleOnClick = async () => {
        const collectionRef = collection(dbService, 'items');
        const q = query(collectionRef, where('userId', '==', currentUser.uid));
        if (confirm('삭제하시겠습니까?')) {
            const unsubscribes = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach(async (document) => {
                    if (
                        document.data().userId === currentUser.uid &&
                        document.data().title === userTitle
                    ) {
                        await deleteDoc(doc(dbService, 'items', document.id));
                    }
                });
            });
            dispatch(itemListAction.removeList(idTitle));
            router.push('/');
        }
    };
    return <S.DeleteBtn onClick={handleOnClick}>삭제</S.DeleteBtn>;
};

export default RequestDltBtn;
