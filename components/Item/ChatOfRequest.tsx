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
import { useDispatch } from 'react-redux';
import { docIdAction } from 'store';
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
                대화중인 채팅방 <span>{isChatOpen && chatArr.length}</span>
            </ChatCount>
            {chatArr.length > 0 &&
                chatArr.map((chat) => (
                    <Link key={chat.id} href={`/chats/${id}`}>
                        <Chat
                            data-id={chat.id}
                            onClick={handleClick}
                            isChatOpen={isChatOpen}
                        >
                            {isChatOpen && (
                                <>
                                    <NickName>{chat.nickName[0]}</NickName>
                                    <LastChatText>{chat.lastChat}</LastChatText>
                                </>
                            )}
                        </Chat>
                    </Link>
                ))}
        </ChatList>
    );
};

const ChatList = styled.div<{ isChatOpen: boolean }>`
    position: absolute;
    width: 390px;
    min-height: 10%;
    bottom: 0;
    background-color: ${colors.lightDark};
    color: ${(props) => (props.isChatOpen ? colors.white : colors.lightDark)};
    display: flex;
    flex-direction: column;
    transform: translate(
        -20px,
        ${(props) => (props.isChatOpen ? `0` : `200px`)}
    );
    opacity: ${(props) => (props.isChatOpen ? 1 : 0)};
    z-index: ${(props) => (props.isChatOpen ? 10 : -99)};
    transition: 300ms;
`;
const ChatCount = styled.div`
    margin: 10px 0 10px 10px;
    & span {
        color: ${colors.gold};
    }
`;
const Chat = styled.div<{ isChatOpen: boolean }>`
    max-width: 100%;
    display: flex;
    padding: 1rem;
    align-items: center;
    border-top: ${(props) =>
        props.isChatOpen ? `0.1px solid ${colors.gold}` : ''};
    cursor: pointer;
`;

const NickName = styled.div`
    margin-right: 10px;
`;

const LastChatText = styled.div``;

export default ChatOfRequest;
