import { authService } from 'fbase';
import { sendEmailVerification, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as S from './styles';

type Props = {};

const EmailVerify = (props: Props) => {
    const router = useRouter();
    const [loginUser, setLoginUser] = useState<User | null>();
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            setLoginUser(user);
        });
    }, []);

    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loginUser) {
            sendEmailVerification(loginUser);
            console.log('이메일발송');
        }
    };

    const handleCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
        router.reload();
    };
    return (
        <S.Emailbox>
            {!loginUser?.emailVerified && (
                <S.VerifyBtn onClick={handleOnClick}>
                    이메일 인증하기
                </S.VerifyBtn>
            )}
            <S.CheckVerified
                onClick={handleCheck}
                disabled={loginUser?.emailVerified && true}
            >
                {!loginUser?.emailVerified
                    ? '이메일인증 확인하기'
                    : '인증되었습니다'}
            </S.CheckVerified>
            {loginUser?.emailVerified && (
                <S.UpdateUser type="submit" value={'update User'} />
            )}
        </S.Emailbox>
    );
};

export default EmailVerify;
