import styled from '@emotion/styled';
import { authService } from 'fbase';
import { sendEmailVerification, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';

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
        <Emailbox>
            {!loginUser?.emailVerified && (
                <VerifyBtn onClick={handleOnClick}>이메일 인증하기</VerifyBtn>
            )}
            <CheckVerified
                onClick={handleCheck}
                disabled={loginUser?.emailVerified && true}
            >
                {!loginUser?.emailVerified
                    ? '이메일인증 확인하기'
                    : '인증되었습니다'}
            </CheckVerified>
            {loginUser?.emailVerified && (
                <UpdateUser type="submit" value={'update User'} />
            )}
        </Emailbox>
    );
};

export default EmailVerify;

const Emailbox = styled.div`
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-around;
`;

const VerifyBtn = styled.button`
    width: 33%;
`;

const CheckVerified = styled.button`
    width: 33%;
    height: 40px;
    border-radius: 15px;
    background-color: ${colors.lightDark};
    color: ${colors.gold};
`;

const UpdateUser = styled.input`
    width: 33%;
    height: 40px;
    border-radius: 15px;
    background-color: ${colors.gold};
    color: ${colors.dark};
`;
