import React from 'react';
import styled from '@emotion/styled';
import ChattingInput from './ChattingInput';
import { ItemTypes } from 'store';
import Conversations from './Conversations';

type Props = {
    items: ItemTypes | undefined;
};

const ChattingRoom = (props: Props) => {
    const { items } = props;

    return (
        <ChattingContainer>
            <ChatOpponent>
                {items?.nickName} 님의 {items?.title} 요청 채팅
            </ChatOpponent>
            <Conversations items={items} />
            <ChattingInput items={items} />
        </ChattingContainer>
    );
};

const ChattingContainer = styled.div`
    max-width: 390px;
    height: 100%;
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
`;

const ChatOpponent = styled.h1`
    flex: 0.75 1 0;
    font-size: 1.5rem;
    font-weight: bold;
    width: 385px;
`;

export default ChattingRoom;
