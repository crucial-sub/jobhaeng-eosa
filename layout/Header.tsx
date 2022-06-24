import React from 'react';
import styled from '@emotion/styled';
import FilterBtn from 'components/Filter/FilterBtn';
import SearchBox from 'components/Search';
import { MdOutlineArrowBackIos } from 'react-icons/md';
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
                        <FilterBtn />
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
    height: 100%;
    display: flex;
    width: 100%;
    align-items: center;
`;

export default Header;
