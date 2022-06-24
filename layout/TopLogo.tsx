import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';

type Props = {};

const TopLogo = (props: Props) => {
    return (
        <Link href={'/'}>
            <Title>잡행어사</Title>
        </Link>
    );
};

const Title = styled.h1`
    flex: 0.5 1 0;
    width: 100%;
    height: 6vh;
    padding: 1vh 0;
    line-height: 6vh;
    text-align: center;
    font-size: 35px;
    background-color: skyblue;
    cursor: pointer;
`;

export default TopLogo;
