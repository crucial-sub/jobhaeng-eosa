import React, { useState } from 'react';
import styled from '@emotion/styled';
import ChattingInput from './ChattingInput';
import { ItemTypes } from 'store';
import Conversations from './Conversations';
import colors from 'styles/colors';
import ChatsInfo from './ChatsInfo';

type Props = {
    items: ItemTypes | undefined;
};

const ChattingRoom = (props: Props) => {
    const { items } = props;
    const [userNickName, setUserNickName] = useState('');

    return (
        <ChattingContainer>
            <ChatsInfo items={items} />
            <Conversations items={items} />
            <ChattingInput items={items} />
        </ChattingContainer>
    );
};

const ChattingContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
`;

export default ChattingRoom;
