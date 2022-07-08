import styled from '@emotion/styled';
import RequestEnd from 'components/Request/RequestEnd';
import React from 'react';
import ChatOut from './ChatOut';
import RequestAccept from './RequestAccept';

type Props = {};

const ChatHeader = (props: Props) => {
    return (
        <HeaderBox>
            <ChatOut />
            <RequestAccept />
            <RequestEnd />
        </HeaderBox>
    );
};

const HeaderBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default ChatHeader;
