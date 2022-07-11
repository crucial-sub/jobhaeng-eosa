import styled from '@emotion/styled';
import { dbService } from 'fbase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatTypes, ItemTypes, RootState } from 'store';
import ChatOut from './ChatOut';
import RequestAccept from './RequestAccept';
import RequestCancel from './RequestCancel';

type Props = {};

const ChatHeader = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { docId } = useSelector((state: RootState) => state.docId);
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const [item, setItem] = useState<ItemTypes>();
    const [chat, setChat] = useState<ChatTypes>();
    const router = useRouter();
    const itemId = router.query.chatId?.toString();

    useEffect(() => {
        if (itemId) {
            setItem(itemList.find((el) => el.id === itemId));
        }
    }, [itemId, itemList]);

    const getChat = async () => {};
    useEffect(() => {
        const collectionRef = collection(dbService, 'chats');
        const q = query(collectionRef, where('id', '==', docId));
        const getChat = onSnapshot(q, async (querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                doc.id === docId && setChat(doc.data());
            });
        });
    }, [docId, chat]);

    return (
        <HeaderBox>
            <ChatOut />
            {currentUser.uid === item?.userId && !chat?.ongoing && (
                <>
                    <RequestAccept item={item} itemId={itemId!} />
                </>
            )}
            {chat?.ongoing && (
                <>
                    <RequestCancel item={item!} itemId={itemId!} />
                </>
            )}
        </HeaderBox>
    );
};

const HeaderBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default ChatHeader;