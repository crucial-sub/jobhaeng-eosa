import { dbService } from 'fbase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import styled from '@emotion/styled';

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
    const { itemDocId } = useSelector((state: RootState) => state.itemDoc);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { docId } = useSelector((state: RootState) => state.docId);

    useEffect(() => {
        if (docId) {
            const chatRef = collection(dbService, 'chats', docId, 'messages');
            const g = query(chatRef, orderBy('timestamp', 'asc'));
            const unsubscribe = onSnapshot(g, (querySnapshot) => {
                const mes = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    timeStamp: doc.data().timestamp?.toDate().getTime(),
                }));
                setMessages(mes);
            });
        }
    }, [docId]);
    // console.log(messages);
    return (
        <ContentBox>
            {messages &&
                messages.map((a, i) => {
                    if (a.user === currentUser.email) {
                        return (
                            <MyMessage key={i}>
                                <div>{a.message}</div>
                                <div>{a.nickName}</div>
                                <div>{a.timeStamp}</div>
                            </MyMessage>
                        );
                    } else {
                        return (
                            <OpponentMessage key={i}>
                                <div>{a.message}</div>
                                <div>{a.nickName}</div>
                                <div>{a.timeStamp}</div>
                            </OpponentMessage>
                        );
                    }
                })}
        </ContentBox>
    );
};

const ContentBox = styled.div`
    width: 100%;

    position: relative;
`;

const MyMessage = styled.div`
    position: relative;

    display: flex;
    text-align: right;
    width: 100%;
`;

const OpponentMessage = styled.div`
    position: relative;
    text-align: left;
    display: flex;
    width: 100%;
`;

export default Conversations;
