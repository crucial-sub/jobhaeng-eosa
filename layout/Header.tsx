import React from 'react';
import styled from '@emotion/styled';
import Filter from 'components/Filter';
import SearchBox from 'components/Search';
import GoBack from './GoBack';
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
                {pathname === '/chats' && <TabName>채팅</TabName>}
                {pathname === '/chats/[chatId]' && (
                    <>
                        <GoBack />
                        <ChatHeader />
                    </>
                )}
                {pathname === '/user' && <TabName>마이 페이지</TabName>}
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
    background-color: #eeeeee;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;

const HeaderBox = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    /* justify-content: space-between; */
    flex-grow: 1 4 4;
    width: 100%;
    align-items: center;

    & svg {
        cursor: pointer;
    }
`;
const TabName = styled.div`
    margin-left: 1rem;
    font-size: 1.3rem;
    font-weight: 600;
`;

export default Header;
