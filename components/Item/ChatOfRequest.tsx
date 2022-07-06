import styled from '@emotion/styled';
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
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {
    id: string | string[] | undefined;
    item: ItemTypes;
};

const ChatOfRequest = (props: Props) => {
    const { id, item } = props;
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [chatArr, setChatArr] = useState<DocumentData[]>([]);
    console.log(chatArr);
    useEffect(() => {
        const collectionRef = collection(dbService, 'chats');
        const q = query(collectionRef, where('requestId', '==', id));
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const chatArray = querySnapshot.docs.map(
                (doc: QueryDocumentSnapshot<DocumentData>) => doc.data(),
            );
            setChatArr(chatArray);
        });
    }, []);
    return (
        <ChatList>
            {chatArr.length > 0 &&
                chatArr.map((chat) => (
                    <Link key={chat.id} href={`/chats/${chat.id}`}>
                        <div>
                            <div>{chat.nickName[0]}</div>
                            <div>{chat.da}</div>
                        </div>
                    </Link>
                ))}
        </ChatList>
    );
};

const ChatList = styled.div`
    position: absolute;
    width: 100%;
    min-height: 20%;
    bottom: 0;
    background-color: beige;
`;

export default ChatOfRequest;
