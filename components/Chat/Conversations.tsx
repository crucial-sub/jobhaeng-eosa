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
import styled from '@emotion/styled';
import { getTimeDate } from 'utils/dateFormat';
import colors from 'styles/colors';

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
    const date = new Date();
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
                <ChatWith>{userNickName}님 과의 채팅</ChatWith>
            )}
            <ContentBox>
                {messages &&
                    isOn &&
                    messages.map((a, i) => {
                        if (a.user === currentUser.email) {
                            return (
                                <MyMessage key={i}>
                                    <Message>{a.message}</Message>
                                    <Times>
                                        <div>{a.timeStamp}</div>
                                    </Times>
                                </MyMessage>
                            );
                        } else {
                            return (
                                <OpponentMessage key={i}>
                                    <Omessage>
                                        <OppoMessage>{a.message}</OppoMessage>
                                        <Times>{a.timeStamp}</Times>
                                    </Omessage>
                                </OpponentMessage>
                            );
                        }
                    })}
                <LastOfMessages ref={lastMessageRef} />
            </ContentBox>
        </>
    );
};

const ContentBox = styled.div`
    width: 100%;
    flex: 8.5 1 0;
    overflow: scroll;
    margin-top: 10px;
`;

const ChatWith = styled.div`
    width: 390px;
    margin: 5px auto 0px auto;
    text-align: center;
    position: sticky;
`;

const MyMessage = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 5px;
    right: 5px;

    & div {
        padding: 5px;
    }
`;

const Message = styled.div`
    border-radius: 15px;
    /* max-width: 80%;ㄴ */
    background-color: ${colors.gold};
    line-height: 30px;
    padding: 5px;
`;

const OpponentMessage = styled.div`
    margin-top: 5px;
    position: relative;
    text-align: left;
    display: flex;
    left: 5px;
`;

const Omessage = styled.div`
    display: flex;
    flex-direction: row;
`;

const OppoMessage = styled.div`
    border-radius: 15px;
    background-color: ${colors.gold};
    padding: 10px;
    margin-right: 5px;
`;

const Times = styled.div`
    padding: 10px;
    min-width: 80px;
`;

const LastOfMessages = styled.div`
    margin-bottom: 0;
`;

export default Conversations;
