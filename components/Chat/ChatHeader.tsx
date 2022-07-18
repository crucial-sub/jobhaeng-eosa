import { dbService } from 'fbase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatTypes, ItemTypes, RootState } from 'store';
import ChatOut from './ChatOut';
import RequestAccept from './RequestAccept';
import RequestCancel from './RequestCancel';
import * as S from './styles';

type Props = {};

const ChatHeader = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { docId } = useSelector((state: RootState) => state.docId);
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const [item, setItem] = useState<ItemTypes>();
    const [chat, setChat] = useState<ChatTypes>();
    const [isOngoing, setIsOngoing] = useState<boolean>(false);
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
        const q = query(collectionRef, where('requestId', '==', itemId));
        const getChat = onSnapshot(q, async (querySnapshot) => {
            if (querySnapshot.docs.some((doc) => doc.data().ongoing === true)) {
                setIsOngoing(true);
            } else setIsOngoing(false);
            querySnapshot.docs.forEach((doc) => {
                doc.id === docId && setChat(doc.data());
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [docId, chat]);

    return (
        <S.HeaderBox>
            <ChatOut />
            {}
            {currentUser.uid === item?.userId && !chat?.ongoing && !isOngoing && (
                <>
                    <RequestAccept item={item} itemId={itemId!} />
                </>
            )}
            {chat?.ongoing && (
                <>
                    <RequestCancel item={item!} itemId={itemId!} />
                </>
            )}
        </S.HeaderBox>
    );
};

export default ChatHeader;
