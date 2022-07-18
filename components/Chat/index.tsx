import React from 'react';
import ChattingInput from './ChattingInput';
import { ItemTypes } from 'store';
import Conversations from './Conversations';
import ChatsInfo from './ChatsInfo';
import * as S from './styles';

type Props = {
    items: ItemTypes | undefined;
};

const ChattingRoom = (props: Props) => {
    const { items } = props;

    return (
        <S.ChattingContainer>
            <ChatsInfo items={items} />
            <Conversations items={items} />
            <ChattingInput items={items} />
        </S.ChattingContainer>
    );
};

export default ChattingRoom;
