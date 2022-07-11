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
    padding: 1.25vh 0;
    text-align: center;
    font-size: 35px;
    background-color: #393e46;
    color: #ffd369;
    cursor: pointer;
`;

export default TopLogo;
