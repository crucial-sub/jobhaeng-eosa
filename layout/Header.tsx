import React from 'react';
import styled from '@emotion/styled';
import Filter from 'components/Filter';
import SearchBox from 'components/Search';
import GoBack from './GoBack';
import ChatOut from 'components/Chat/ChatOut';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import RequestAccept from 'components/Chat/RequestAccept';
import ChatHeader from 'components/Chat/ChatHeader';

type Props = {
    pathname: string;
};

const Header = (props: Props) => {
    const { pathname } = props;

    return (
        <HeaderContainer>
            <HeaderBox>
                {pathname === '/' && (
                    <>
                        <Filter />
                        <SearchBox />
                    </>
                )}
                {pathname === '/search/[searchValue]' && (
                    <>
                        <GoBack />
                        <SearchBox />
                    </>
                )}
                {pathname === '/chats' && <div>채팅</div>}
                {pathname === '/chats/[chatId]' && (
                    <>
                        <GoBack />
                        <ChatHeader />
                    </>
                )}
                {pathname === '/user' && <div>마이 페이지</div>}
                {pathname === '/request' && <GoBack />}
                {pathname === '/user/edit' && <GoBack />}
                {pathname === '/items/[id]' && <GoBack />}
                {pathname === '/edititem/[id]' && <GoBack />}
            </HeaderBox>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    width: 100%;
    flex: 0.75 1 0;
    display: flex;
    flex-direction: column;
    background-color: aliceblue;
`;

const HeaderBox = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    width: 100%;
    align-items: center;

    & svg {
        cursor: pointer;
    }
`;

export default Header;
