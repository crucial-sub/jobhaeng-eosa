import { dbService } from 'fbase';
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import { getTimeDate } from 'utils/dateFormat';
import * as S from './styles';

type Props = {
    items: ItemTypes | undefined;
};

export interface ChatContentType {
    message?: string;
    timeStamp?: string;
    user?: string | undefined;
    id?: string | undefined;
    nickName?: string | undefined;
}

const Conversations = (props: Props) => {
    const { items } = props;
    const [messages, setMessages] = useState<ChatContentType[]>([]);
    const [userNickName, setUserNickName] = useState('');
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { docId } = useSelector((state: RootState) => state.docId);
    const [isOn, setIsOn] = useState<boolean>();
    const lastMessageRef = useRef<null | HTMLDivElement>(null);
    const bottomScroll = () => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        bottomScroll();
    }, [messages]);
    useEffect(() => {
        if (docId !== '') {
            const chatRef = collection(dbService, 'chats', docId, 'messages');
            const g = query(chatRef, orderBy('timestamp', 'asc'));

            const unsubscribe = onSnapshot(g, async (querySnapshot) => {
                const mes = await querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    timeStamp: getTimeDate(doc.data().timestamp?.toDate()),
                }));
                setMessages(mes);
            });
        }
    }, [messages, docId]);

    useEffect(() => {
        if (docId !== '') {
            const collectionRef = collection(dbService, 'chats');
            const q = query(collectionRef, where('id', '==', docId));
            const onOffCheck = onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.docs[0]) {
                    let chatOnOff;
                    if (currentUser.uid === items?.userId) {
                        chatOnOff = querySnapshot.docs[0].data().onOff[1];
                        setUserNickName(
                            querySnapshot.docs[0].data().nickName[0],
                        );
                    } else {
                        chatOnOff = querySnapshot.docs[0].data().onOff[0];
                        setUserNickName(
                            querySnapshot.docs[0].data().nickName[1],
                        );
                    }
                    if (chatOnOff === 'on') {
                        setIsOn(true);
                    } else if (chatOnOff === 'off') {
                        setIsOn(false);
                    }
                }
            });
        }
    }, [messages, docId]);

    return (
        <>
            {userNickName !== '' && (
                <S.ChatWith>{userNickName}님 과의 채팅</S.ChatWith>
            )}
            <S.ContentBox>
                {messages &&
                    isOn &&
                    messages.map((a, i) => {
                        if (a.user === currentUser.email) {
                            return (
                                <S.MyMessage key={i}>
                                    <S.Message>{a.message}</S.Message>
                                    <S.Times>
                                        <div>{a.timeStamp}</div>
                                    </S.Times>
                                </S.MyMessage>
                            );
                        } else {
                            return (
                                <S.OpponentMessage key={i}>
                                    <S.Omessage>
                                        <S.OppoMessage>
                                            {a.message}
                                        </S.OppoMessage>
                                        <S.Times>{a.timeStamp}</S.Times>
                                    </S.Omessage>
                                </S.OpponentMessage>
                            );
                        }
                    })}
                <S.LastOfMessages ref={lastMessageRef} />
            </S.ContentBox>
        </>
    );
};

export default Conversations;
