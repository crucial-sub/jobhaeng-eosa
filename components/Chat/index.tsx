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
import { itemNdocAction, ItemTypes, RootState } from 'store';
import Conversations from './Conversations';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

type Props = {
    items: ItemTypes | undefined;
};

type docIdType = {
    docc: string | undefined;
};

const ChattingRoom = (props: Props) => {
    const { items } = props;
    const [docId, setDocId] = useState('');
    const [docc, setDocc] = useState<string | undefined>();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { itemDocId } = useSelector((state: RootState) => state.itemDoc);
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
                        // ...doc.data(),
                        itemsId: doc.data().requestId,
                        docNumber: doc.id,
                    }),
                );
                dispatch(itemNdocAction.itemDocId(chatArray));
            });
        }
        itemDocId.map((a) => {
            if (a.itemsId === items?.id) {
                return setDocc(a.docNumber);
            }
        });
    }, [items]);
    console.log(docc);
    return (
        <>
            <ChattingContainer>
                <div>
                    <ChatOpponent>
                        {items?.nickName} 님의 {items?.title} 요청 채팅
                    </ChatOpponent>
                </div>
                <Conversations items={items} docc={docc} />
            </ChattingContainer>
            <ChattingInput items={items} docc={docc} setDocId={setDocId} />
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
