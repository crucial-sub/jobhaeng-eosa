import React from 'react';
import { ItemTypes } from 'store';
import * as S from './styles';

type Props = {
    items: ItemTypes | undefined;
};

const ChatsInfo = (props: Props) => {
    const { items } = props;
    return (
        <S.ChatInfo>
            <S.TitleNLocation>
                <S.Titles>{items?.title?.slice(0, 15)}</S.Titles>
                <S.Location>{items?.location?.slice(0, 25)}</S.Location>
            </S.TitleNLocation>
            <S.RewardNickName>
                <S.NickName>{items?.nickName} 님의 글</S.NickName>
                <S.Reward>보상 : {items?.reward}</S.Reward>
            </S.RewardNickName>
        </S.ChatInfo>
    );
};

export default ChatsInfo;
