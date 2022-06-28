import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { dbService } from 'fbase';
import ChattingInput from './ChattingInput';

type Props = {
    chatId: string | string[] | undefined;
    nickName: string | undefined;
};

const ChattingRoom = (props: Props) => {
    const { chatId, nickName } = props;

    return (
        <>
            <ChattingContainer>
                <div>
                    <ChatOpponent>{nickName}님과의 채팅</ChatOpponent>
                </div>
            </ChattingContainer>
            <ChattingInput />
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
    font-size: 2rem;
    font-weight: bold;
    width: 385px;
`;

// const ChattingInput = styled.textarea``;

export default ChattingRoom;
