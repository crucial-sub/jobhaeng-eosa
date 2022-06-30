import styled from '@emotion/styled';
import ChattingRoom from 'components/Chat';
import { dbService } from 'fbase';
import {
    addDoc,
    getDocs,
    collection,
    onSnapshot,
    query,
    where,
} from 'firebase/firestore';
import { authService } from 'fbase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {};

const ChatPage = (props: Props) => {
    const router = useRouter();
    const [items, setItems] = useState<ItemTypes>();
    const { chatId } = router.query;

    const { itemList } = useSelector((state: RootState) => state.itemList);

    useEffect(() => {
        if (chatId) {
            setItems(itemList.find((a) => a.id === chatId));
        }
    }, [chatId, itemList]);
    console.log(items);

    return <ChattingRoom chatId={chatId} items={items} />;
};

export default ChatPage;
