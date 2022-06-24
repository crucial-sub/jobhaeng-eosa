import React from 'react';
import styled from '@emotion/styled';
import FilterBtn from 'components/Filter/FilterBtn';
import SearchBox from 'components/Search';
import Link from 'next/link';

type Props = {};

const Header = (props: Props) => {
    return (
        <HeaderContainer>
            <HeaderBox>
                <FilterBtn />
                <SearchBox />
            </HeaderBox>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    width: 100%;
    flex: 0.75 1 0;
    display: flex;
    flex-direction: column;
`;

const HeaderBox = styled.div`
    height: 100%;
    display: flex;
    width: 100%;
`;

export default Header;
