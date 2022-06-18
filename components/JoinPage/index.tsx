import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { authService, dbService } from 'fbase';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { currentUserAction, joinAction, loginAction, RootState } from 'store';
import { useSelector } from 'react-redux';
import { addDoc, collection, getDoc } from 'firebase/firestore';
import BacktoLogin from './BacktoLogin';

type Props = {};

const JoinPage = (props: Props) => {
    const dispatch = useDispatch();
    const { checkLogin } = useSelector((state: RootState) => state.login);
    const [email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

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
            const data = await createUserWithEmailAndPassword(
                authService,
                email,
                Password,
            );
            dispatch(loginAction.login(!checkLogin));
            const collectionRef = collection(dbService, 'users');
            const docRef = await addDoc(collectionRef, {
                uid: data.user.uid,
                email: data.user.email,
            });
            const user = (await getDoc(docRef)).data();
            dispatch(currentUserAction.user(user));
            router.push('/user/edit');
        } catch (err: any) {
            setError(err);
            console.log(error);
        }
    };

    useEffect(() => {
        router.beforePopState(() => {
            dispatch(joinAction.join(false));
            router.push('/');
            return false;
        });

        return () => {
            router.beforePopState(() => false);
        };
    }, []);
    return (
        <RegistBox>
            <RegistForm onSubmit={onSubmit}>
                <RegistTitle>잡행어사 회원가입</RegistTitle>
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
                        value={Password}
                        onChange={onChange}
                        placeholder="password"
                        required
                    />
                </div>

                <RegistBtn type="submit" value={'Create Account'} />
                <p>{error ? `${error}` : <></>}</p>
            </RegistForm>

            <BacktoLogin />
        </RegistBox>
    );
};

const RegistBox = styled.div`
    width: 100%;
    height: 100%;
`;

const RegistTitle = styled.h1`
    width: 100%;
    font-size: 2rem;
    text-align: center;
`;

const RegistForm = styled.form`
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

const RegistBtn = styled.input`
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    border: 1px solid silver;
    background-color: skyblue;
    cursor: pointer;
`;

export default JoinPage;
