import { authService } from 'fbase';
import { sendEmailVerification, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {};

const EmailVerify = (props: Props) => {
    const router = useRouter();
    const [loginUser, setLoginUser] = useState<User | null>();
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            setLoginUser(user);
        });
    }, []);
    console.log(loginUser);

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
        <>
            {!loginUser?.emailVerified && (
                <button onClick={handleOnClick}>이메일 인증하기</button>
            )}
            <button onClick={handleCheck}>
                {!loginUser?.emailVerified
                    ? '이메일인증 확인하기'
                    : '인증되었습니다'}
            </button>
            {loginUser?.emailVerified && (
                <input type="submit" value={'update User'} />
            )}
        </>
    );
};

export default EmailVerify;
