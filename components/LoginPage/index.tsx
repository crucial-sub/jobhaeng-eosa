import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from 'fbase';
import { useRouter } from 'next/router';

type Props = {};

const LoginPage = (props: Props) => {
    // const [login, setLogin] = useState(false);
    const router = useRouter();
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

    console.log(authService.currentUser);
    return (
        <LoginBox>
            <LoginForm onSubmit={onSubmit}>
                <div>
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
                </div>
                <div>
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
                </div>

                <LoginBtn type="submit" value={'Login'} />
                <p>{error ? `${error}` : <></>}</p>
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

const LoginBtn = styled.input`
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

export default LoginPage;