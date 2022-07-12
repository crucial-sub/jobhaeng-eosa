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
        console.log(itemDocId);
        const bbb = itemDocId.some((a) => {
            if (a.itemsId === item?.id) {
                dispatch(docIdAction.docId(a.docNumber));
            }
        });
    }, [item]);

    return (
        <Link href={`/chats/${id}`}>
            <button>채팅하기</button>
        </Link>
    );
};

export default ChatButton;
