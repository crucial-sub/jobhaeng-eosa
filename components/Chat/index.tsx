import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import ChattingInput from './ChattingInput';
import { ItemTypes, RootState } from 'store';
import Conversations from './Conversations';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import ChatOut from './ChatOut';

type Props = {
    items: ItemTypes | undefined;
};

const ChattingRoom = (props: Props) => {
    const { items } = props;
    const dispatch = useDispatch();

    return (
        <>
            <ChattingContainer>
                <div>
                    <ChatOpponent>
                        {items?.nickName} 님의 {items?.title} 요청 채팅
                    </ChatOpponent>
                </div>
                <Conversations items={items} />
            </ChattingContainer>
            <ChattingInput items={items} />
        </>
    );
};

const ChattingContainer = styled.div`
    max-width: 390px;
    height: 700px;
    max-height: 100vh;
    background-color: aliceblue;
`;

const ChatOpponent = styled.h1`
    font-size: 1.5rem;
    font-weight: bold;
    width: 385px;
`;

export default ChattingRoom;
