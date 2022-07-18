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
import * as S from './styles';

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
        <S.ChatList isChatOpen={isChatOpen}>
            <S.ChatCount>
                대화중인 채팅방 <span>{isChatOpen && chatArr.length}</span>
            </S.ChatCount>
            {chatArr.length > 0 &&
                chatArr.map((chat) => (
                    <Link key={chat.id} href={`/chats/${id}`}>
                        <S.Chat
                            data-id={chat.id}
                            onClick={handleClick}
                            isChatOpen={isChatOpen}
                        >
                            {isChatOpen && (
                                <>
                                    <S.NickName>{chat.nickName[0]}</S.NickName>
                                    <S.LastChatText>
                                        {chat.lastChat}
                                    </S.LastChatText>
                                </>
                            )}
                        </S.Chat>
                    </Link>
                ))}
        </S.ChatList>
    );
};

export default ChatOfRequest;
