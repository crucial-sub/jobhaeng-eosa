import styled from '@emotion/styled';
import { dbService } from 'fbase';
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
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

    const getChat = async () => {
        const collectionRef = collection(dbService, 'chats');
        const docRef = await getDocs(collectionRef);
        docRef.docs.forEach((doc) => {
            doc.id === docId && setChat(doc.data());
        });
    };

    useEffect((): VoidFunction => {
        return getChat;
    }, [docId]);

    return (
        <HeaderBox>
            <ChatOut />
            {currentUser.uid === item?.userId && itemId && !chat?.ongoing && (
                <>
                    <RequestAccept item={item} itemId={itemId} />
                </>
            )}
            {chat?.ongoing && (
                <>
                    <RequestCancel />
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
