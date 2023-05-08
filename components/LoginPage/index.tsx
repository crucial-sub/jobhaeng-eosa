import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authService } from 'fbase';
import { useDispatch } from 'react-redux';
import { joinAction, RootState } from 'store';
import { useSelector } from 'react-redux';
import GoogleLogin from './GoogleLogin';
import * as S from './styles';

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
            switch (err.code) {
                case 'auth/invalid-email':
                    setError('잘못된 이메일 주소입니다');
                    break;
                case 'auth/wrong-password':
                    setError('비밀번호가 다릅니다');
            }
        }
    };

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(joinAction.join(!clickJoin));
    };
    return (
        <S.Container>
            <S.LoginBox>
                <S.LoginForm onSubmit={onSubmit}>
                    <S.LoginTitle>로그인</S.LoginTitle>
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
                            value={password}
                            onChange={onChange}
                            placeholder="password"
                            required
                        />
                    </S.PwInput>
                    {error ? <S.ErrMessage> {error}</S.ErrMessage> : <></>}
                    <S.LoginBtn type="submit" value={'Login'} />
                    <GoogleLogin />
                    <S.JoinBtn onClick={onClick}>회원가입</S.JoinBtn>
                </S.LoginForm>
            </S.LoginBox>
        </S.Container>
    );
};

export default LoginPage;
