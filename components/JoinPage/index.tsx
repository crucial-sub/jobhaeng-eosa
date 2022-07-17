import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService, dbService } from 'fbase';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { joinAction, loginAction, RootState } from 'store';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import BacktoLogin from './BacktoLogin';
import colors from 'styles/colors';

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
        <Container>
            <JoinBox>
                <RegistBox>
                    <RegistForm onSubmit={onSubmit}>
                        <RegistTitle>잡행어사 회원가입</RegistTitle>
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
                                value={Password}
                                onChange={onChange}
                                placeholder="password"
                                required
                            />
                        </PwInput>

                        <RegistBtn type="submit" value={'회원가입하기'} />
                        <p>{error ? `${error}` : <></>}</p>
                        <BacktoLogin />
                    </RegistForm>
                </RegistBox>
            </JoinBox>
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
const JoinBox = styled.div`
    width: 100%;
    height: 100%;
`;

const RegistBox = styled.div`
    width: 100%;
    height: 100%;
`;

const RegistTitle = styled.h1`
    width: 100%;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 15px;
`;

const RegistForm = styled.form`
    display: flex;
    height: 50%;
    flex-direction: column;
    justify-content: center;
    & div {
        /* margin: 20px 20px; */
        width: 90%;
        display: flex;
    }
    & div > label {
        width: 20%;
        line-height: 30px;
    }
    & div > input {
        width: 80%;
        height: 4vh;
    }
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

const RegistBtn = styled.input`
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

export default JoinPage;
