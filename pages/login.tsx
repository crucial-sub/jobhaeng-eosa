import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

type Props = {};

const Login = (props: Props) => {
    return (
        <LoginBox>
            <LoginForm>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" />
                </div>
                <div>
                    <label htmlFor="password">PW</label>
                    <input id="password" />
                </div>
                <div>
                    <LoginBtn>로그인</LoginBtn>
                </div>
            </LoginForm>
            <Link href="/join">
                <JoinBtn>회원가입</JoinBtn>
            </Link>
        </LoginBox>
    );
};

const LoginBox = styled.div`
    width: 100%;
    height: 100%;
`;

const LoginForm = styled.form`
    display: flex;
    height: 50%;
    flex-direction: column;
    justify-content: center;
    & div {
        margin: 20px 20px;
        width: 90%;
        display: flex;
    }
    & div > label {
        width: 20%;
        line-height: 30px;
    }
    & div > input {
        width: 80%;
        height: 30px;
    }
`;

const LoginBtn = styled.form`
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    border: 1px solid silver;
    background-color: skyblue;
    cursor: pointer;
`;

const JoinBtn = styled.div`
    width: 5vw;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    border: 1px solid silver;
    background-color: skyblue;
    cursor: pointer;
    margin: auto;
`;

export default Login;
