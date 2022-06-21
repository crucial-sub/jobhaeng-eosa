import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { itemListAction, RootState } from 'store';
import { useDispatch } from 'react-redux';
import { Router, useRouter } from 'next/router';
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDocs,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';
import { dbService } from 'fbase';
import { remove } from 'firebase/database';

type Props = {
    userId: string;
    userTitle: string;
    currentUserUid: string;
};

const RequestDltBtn = (props: Props) => {
    const dispatch = useDispatch();
    const { itemList } = useSelector((state: RootState) => state.itemList);
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
                    console.log(document.id);
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
    return <UpdateBtn onClick={handleOnClick}>삭제</UpdateBtn>;
};

const UpdateBtn = styled.button`
    width: 50px;
    height: 30px;
`;

export default RequestDltBtn;
