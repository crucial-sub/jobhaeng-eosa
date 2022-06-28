import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { dbService } from 'fbase';
import ChattingInput from './ChattingInput';
import { ItemTypes } from 'store';
import Conversations from './Conversations';

type Props = {
    chatId: string | string[] | undefined;
    items: ItemTypes | undefined;
};

const ChattingRoom = (props: Props) => {
    const { chatId, items } = props;
    const [newMessage, setNewMessage] = useState('');
    // console.log(newMessage);
    return (
        <>
            <ChattingContainer>
                <div>
                    <ChatOpponent>
                        {items?.nickName} 님의 {items?.title} 요청 채팅
                    </ChatOpponent>
                </div>
                <Conversations />
            </ChattingContainer>
            <ChattingInput
                setNewMessage={setNewMessage}
                newMessage={newMessage}
                chatId={chatId}
                items={items}
            />
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

// const ChattingInput = styled.textarea``;

export default ChattingRoom;
