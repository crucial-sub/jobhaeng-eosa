import styled from '@emotion/styled';
import ChattingRoom from 'components/Chat';
import { dbService } from 'fbase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type Props = {};

const ChatPage = (props: Props) => {
    const router = useRouter();
    const { chatId } = router.query;
    const [nickName, setNickName] = useState();

    useState(() => {
        const userCollectionRef = collection(dbService, 'users');
        const q = query(userCollectionRef, where('uid', '==', chatId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach(async (document) => {
                if (document.data().nickName) {
                    setNickName(document.data().nickName);
                }
            });
        });
    });
    return <ChattingRoom chatId={chatId} nickName={nickName} />;
};

export default ChatPage;
