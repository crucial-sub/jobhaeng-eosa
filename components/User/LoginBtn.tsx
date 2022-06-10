import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

type Props = {};

const LoginBtn = (props: Props) => {
    return (
        <Link href="/login">
            <Login>Login</Login>
        </Link>
    );
};

const Login = styled.button`
    position: relative;
    width: 20%;
    height: 100%;
    text-align: center;
    border: none;
`;

export default LoginBtn;
