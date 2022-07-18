import { dbService } from 'fbase';
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { docIdAction, itemNdocAction, ItemTypes, RootState } from 'store';
import * as S from './styles';

type Props = {
    id: string | string[] | undefined;
    item: ItemTypes;
};

const ChatButton = (props: Props) => {
    const { id, item } = props;
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const dispatch = useDispatch();
    const { itemDocId } = useSelector((state: RootState) => state.itemDoc);

    useEffect(() => {
        const chatsRef = collection(dbService, 'chats');
        const q = query(
            chatsRef,
            where('users', 'array-contains', currentUser.uid),
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const chatArray = querySnapshot.docs.map(
                (doc: QueryDocumentSnapshot<DocumentData>) => ({
                    ...doc.data(),
                    itemsId: doc.data().requestId,
                    docNumber: doc.id,
                }),
            );
            dispatch(itemNdocAction.itemDocId(chatArray));
        });
        const bbb = itemDocId.some((a) => {
            if (a.itemsId === item?.id) {
                dispatch(docIdAction.docId(a.docNumber));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item]);

    return (
        <Link href={`/chats/${id}`}>
            <S.ChatBtn>채팅하기</S.ChatBtn>
        </Link>
    );
};

export default ChatButton;
