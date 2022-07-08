import ChattingRoom from 'components/Chat';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

type Props = {};

const ChatPage = (props: Props) => {
    const router = useRouter();
    const [items, setItems] = useState<ItemTypes>();
    const { chatId } = router.query;
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (chatId) {
            setItems(itemList.find((a) => a.id === chatId));
        }
    }, [chatId, itemList]);
    return <ChattingRoom items={items} />;
};

export default ChatPage;
