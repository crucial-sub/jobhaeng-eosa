import React from 'react';
import styled from '@emotion/styled';

type Props = {};

const Header = (props: Props) => {
    return (
        <HeaderContainer>
            <Title>잡행어사</Title>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div``;

const Title = styled.h1`
    text-align: center;
    font-size: 35px;
    background-color: skyblue;
`;

export default Header;
