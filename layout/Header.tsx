import React from 'react';
import styled from '@emotion/styled';
import Filter from 'components/Filter';
import SearchBox from 'components/Search';
import GoBack from './GoBack';

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
`;

export default Header;
