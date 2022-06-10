import React from 'react';
import styled from '@emotion/styled';
import FilterBtn from 'components/Filter/FilterBtn';
import SearchBox from 'components/Search/Search';
import LoginBtn from 'components/User/LoginBtn';

type Props = {};

const Header = (props: Props) => {
    return (
        <HeaderContainer>
            <Title>잡행어사</Title>
            <HeaderBox>
                <FilterBtn />
                <SearchBox />
                <LoginBtn />
            </HeaderBox>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    width: 100%;
    height: 13vh;
    position: absolute;
    top: 0;
`;

const Title = styled.h1`
    width: 100%;
    height: 6vh;
    padding: 1vh 0;
    line-height: 6vh;
    text-align: center;
    font-size: 35px;
    background-color: skyblue;
`;

const HeaderBox = styled.div`
    display: flex;
    width: 100%;
`;

export default Header;
