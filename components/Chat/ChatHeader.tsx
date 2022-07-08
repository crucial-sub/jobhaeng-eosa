import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import ChatOut from './ChatOut';
import RequestAccept from './RequestAccept';

type Props = {};

const ChatHeader = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const [item, setItem] = useState<ItemTypes>();
    const router = useRouter();
    const itemId = router.query.chatId?.toString();
    useEffect(() => {
        if (itemId) {
            setItem(itemList.find((el) => el.id === itemId));
        }
    }, [itemId, itemList]);

    return (
        <HeaderBox>
            <ChatOut />
            {currentUser.uid === item?.userId && itemId && (
                <>
                    <RequestAccept item={item} itemId={itemId} />
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
