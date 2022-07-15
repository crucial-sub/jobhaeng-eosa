import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService, dbService } from 'fbase';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { currentUserAction, joinAction, RootState } from 'store';
import { useSelector } from 'react-redux';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import GoogleLogin from './GoogleLogin';
import colors from 'styles/colors';

type Props = {};

const LoginPage = (props: Props) => {
    const dispatch = useDispatch();
    const { clickJoin } = useSelector((state: RootState) => state.join);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = event;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = await signInWithEmailAndPassword(
                authService,
                email,
                password,
            );
        } catch (err: any) {
            setError(err);
            console.log(error);
        }
    };

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(joinAction.join(!clickJoin));
    };
    return (
        <Container>
            <LoginBox>
                <LoginForm onSubmit={onSubmit}>
                    <LoginTitle>로그인</LoginTitle>
                    <EmailInput>
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="text"
                            id="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            required
                        />
                    </EmailInput>
                    <PwInput>
                        <label htmlFor="password">PW</label>
                        <input
                            name="password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={onChange}
                            placeholder="password"
                            required
                        />
                    </PwInput>
                    <LoginBtn type="submit" value={'Login'} />
                    <p>{error ? `${error}` : <></>}</p>
                    <GoogleLogin />
                    <JoinBtn onClick={onClick}>회원가입</JoinBtn>
                </LoginForm>
            </LoginBox>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
`;

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
        width: 90%;
        display: flex;
    }
    & div > label {
        width: 20%;
        line-height: 30px;
    }
    & div > input {
        width: 80%;
    }
`;

const LoginTitle = styled.h1`
    width: 100%;
    margin-bottom: 10px;
    font-size: 2rem;
    text-align: center;
`;

const EmailInput = styled.div`
    position: relative;
    margin: 15px auto 30px auto;
    & label {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 4vh;
        height: 4vh;
        font-weight: 700;
    }
    & input {
        border-radius: 15px;
        height: 4vh;
    }
`;

const PwInput = styled.div`
    margin: 0px auto 30px auto;
    & label {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4vh;
        line-height: 4vh;
        font-weight: 700;
    }
    & input {
        border-radius: 15px;
        height: 4vh;
    }
`;

const LoginBtn = styled.input`
    width: 90%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    margin: 0 auto 30px auto;
    background-color: ${colors.lightDark};
    border-radius: 20px;
    color: ${colors.gold};
    cursor: pointer;
`;

const JoinBtn = styled.button`
    width: 90%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    margin: 0 auto 30px auto;
    background-color: ${colors.lightDark};
    color: ${colors.gold};
    border-radius: 20px;
    cursor: pointer;
`;

export default LoginPage;
