import styled from '@emotion/styled';
import { dbService } from 'fbase';
import {
    collection,
    DocumentData,
    onSnapshot,
    orderBy,
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
    isOpen: boolean;
};

const ChatOfRequest = (props: Props) => {
    const { id, isOpen } = props;
    const [chatArr, setChatArr] = useState<DocumentData[]>([]);
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
                        <Chat>
                            <NickName>{chat.nickName[0]}</NickName>
                            <LastChatText>{chat.lastChat}</LastChatText>
                        </Chat>
                    </Link>
                ))}
        </ChatList>
    );
};

const ChatList = styled.div`
    position: absolute;
    width: 100%;
    min-height: 10%;
    bottom: 0;
    background-color: beige;
    display: flex;
    flex-direction: column;
`;

const Chat = styled.div`
    width: 100%;
    display: flex;
    margin: 10px 0 10px 10px;
    cursor: pointer;
`;

const NickName = styled.div`
    margin-right: 10px;
`;

const LastChatText = styled.div``;

export default ChatOfRequest;
