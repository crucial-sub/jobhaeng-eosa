import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService, dbService } from 'fbase';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { joinAction, loginAction, RootState } from 'store';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import BacktoLogin from './BacktoLogin';
import * as S from './styles';

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
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError('이미 가입되어 있는 계정입니다');
                    break;
                case 'auth/weak-password':
                    setError('비밀번호는 6자리 이상이어야 합니다');
                    break;
            }
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
        <S.Container>
            <S.JoinBox>
                <S.RegistBox>
                    <S.RegistForm onSubmit={onSubmit}>
                        <S.RegistTitle>잡행어사 회원가입</S.RegistTitle>
                        <S.EmailInput>
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
                        </S.EmailInput>
                        <S.PwInput>
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
                        </S.PwInput>
                        {error ? <S.ErrMessage> {error} </S.ErrMessage> : <></>}
                        <S.RegistBtn type="submit" value={'회원가입하기'} />
                        <BacktoLogin />
                    </S.RegistForm>
                </S.RegistBox>
            </S.JoinBox>
        </S.Container>
    );
};

export default JoinPage;
