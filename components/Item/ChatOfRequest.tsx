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
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { docIdAction, ItemTypes, RootState } from 'store';
import colors from 'styles/colors';

type Props = {
    id: string | string[] | undefined;
    isChatOpen: boolean;
};

const ChatOfRequest = (props: Props) => {
    const { id, isChatOpen } = props;
    const dispatch = useDispatch();
    const [chatArr, setChatArr] = useState<DocumentData[]>([]);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const { id } = e.currentTarget.dataset;
        dispatch(docIdAction.docId(id));
    };
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
        <ChatList isChatOpen={isChatOpen}>
            <ChatCount>
                대화중인 채팅방 <span>{chatArr.length}</span>
            </ChatCount>
            {chatArr.length > 0 &&
                chatArr.map((chat) => (
                    <Link key={chat.id} href={`/chats/${id}`}>
                        <Chat data-id={chat.id} onClick={handleClick}>
                            <NickName>{chat.nickName[0]}</NickName>
                            <LastChatText>{chat.lastChat}</LastChatText>
                        </Chat>
                    </Link>
                ))}
        </ChatList>
    );
};

const ChatList = styled.div<{ isChatOpen: boolean }>`
    position: fixed;
    width: 390px;
    min-height: 10%;
    bottom: 10vh;
    background-color: ${colors.lightDark};
    color: ${colors.white};
    display: flex;
    flex-direction: column;
    transform: translate(
        -19.5px,
        ${(props) => (props.isChatOpen ? `0` : `100vh`)}
    );
    opacity: ${(props) => (props.isChatOpen ? 1 : 0)};
    transition: 400ms;
`;
const ChatCount = styled.div`
    margin: 10px 0 10px 10px;
    & span {
        color: ${colors.gold};
    }
`;
const Chat = styled.div`
    max-width: 100%;
    display: flex;
    padding: 1rem;
    align-items: center;
    border-top: 0.1px solid ${colors.gold};
    cursor: pointer;
`;

const NickName = styled.div`
    margin-right: 10px;
`;

const LastChatText = styled.div``;

export default ChatOfRequest;
