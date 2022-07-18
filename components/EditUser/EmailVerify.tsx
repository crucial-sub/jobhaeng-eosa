import { authService } from 'fbase';
import { sendEmailVerification, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { currentUserAction, RootState } from 'store';
import * as S from './styles';

type Props = {};

const EmailVerify = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loginUser, setLoginUser] = useState<User | null>();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            setLoginUser(user);
            dispatch(
                currentUserAction.user({
                    ...currentUser,
                    emailVerified: user?.emailVerified,
                }),
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (loginUser) {
            sendEmailVerification(loginUser);
        }
    };

    const handleCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
        router.reload();
    };
    return (
        <S.Emailbox>
            {loginUser?.emailVerified === false && (
                <S.VerifyBtn type="button" onClick={handleOnClick}>
                    이메일 인증하기
                </S.VerifyBtn>
            )}
            <S.CheckVerified
                onClick={handleCheck}
                type="button"
                disabled={loginUser?.emailVerified && true}
            >
                {loginUser?.emailVerified === false
                    ? '이메일인증 확인하기'
                    : '인증되었습니다'}
            </S.CheckVerified>
        </S.Emailbox>
    );
};

export default EmailVerify;
