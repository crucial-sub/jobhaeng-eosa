import React from 'react';
import styled from '@emotion/styled';
import { ItemTypes } from 'store';

type Props = {
    items: ItemTypes | undefined;
    // userNickName: string;
};

const ChatsInfo = (props: Props) => {
    const { items } = props;
    return (
        <ChatInfo>
            <TitleNLocation>
                <Titles>{items?.title?.slice(0, 15)}</Titles>
                <Location>{items?.location?.slice(0, 25)}</Location>
            </TitleNLocation>
            <RewardNickName>
                <NickName>{items?.nickName} 님의 글</NickName>
                <Reward>보상 : {items?.reward}</Reward>
            </RewardNickName>
        </ChatInfo>
    );
};

const ChatInfo = styled.div`
    max-width: 380px;
    height: 10%;
    margin-top: 10px;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
`;

const TitleNLocation = styled.div``;

const Titles = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
`;

const Location = styled.div`
    font-size: 0.8rem;
    opacity: 0.5;
    margin-top: 30px;
`;

const Reward = styled.div`
    font-size: 1rem;
    opacity: 0.8;
    margin-top: 30px;
`;

const RewardNickName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const NickName = styled.div`
    font-size: 1rem;
    font-weight: 600;
`;

export default ChatsInfo;
