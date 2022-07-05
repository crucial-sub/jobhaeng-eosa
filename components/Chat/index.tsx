import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';
import { dbService } from 'fbase';
import ChattingInput from './ChattingInput';
import { docIdAction, itemNdocAction, ItemTypes, RootState } from 'store';
import Conversations from './Conversations';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ChatOut from './ChatOut';

type Props = {
    items: ItemTypes | undefined;
};

type docIdType = {
    docc: string | undefined;
};

const ChattingRoom = (props: Props) => {
    const { items } = props;
    const [docc, setDocc] = useState<string | undefined>();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { itemDocId } = useSelector((state: RootState) => state.itemDoc);
    const { docId } = useSelector((state: RootState) => state.docId);
    useEffect(() => {
        const chatsRef = collection(dbService, 'chats');
        const q = query(
            chatsRef,
            where('users', 'array-contains', currentUser.uid),
        );

        if (items) {
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
        }
        itemDocId.map((a) => {
            console.log(a.itemsId + '     ' + items?.id);
            if (a.itemsId === items?.id) {
                return dispatch(docIdAction.docId(a.docNumber));
            }
        });
    }, [items]);

    return (
        <>
            <ChattingContainer>
                <div>
                    <ChatOut items={items} docc={docc} />
                    <ChatOpponent>
                        {items?.nickName} 님의 {items?.title} 요청 채팅
                    </ChatOpponent>
                </div>
                <Conversations items={items} />
            </ChattingContainer>
            <ChattingInput items={items} />
        </>
    );
};

const ChattingContainer = styled.div`
    max-width: 390px;
    height: 700px;
    max-height: 100vh;
    background-color: aliceblue;
`;

const ChatOpponent = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    width: 385px;
`;

export default ChattingRoom;
