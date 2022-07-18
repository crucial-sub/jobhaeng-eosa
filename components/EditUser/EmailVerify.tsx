import { authService } from 'fbase';
import { sendEmailVerification, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { currentUserAction, emailSendingAction, RootState } from 'store';
import * as S from './styles';

type Props = {};

const EmailVerify = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loginUser, setLoginUser] = useState<User | null>();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { isEmailSended } = useSelector(
        (state: RootState) => state.emailSending,
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
            alert(
                '회원님의 이메일로 인증 메일이 발송되었습니다. 메일의 링크를 통해 인증을 완료하신 후 확인 버튼을 눌러주세요.',
            );
            dispatch(emailSendingAction.emailSending(true));
            sendEmailVerification(loginUser);
        }
    };

    const handleCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
        router.reload();
    };
    return (
        <S.Emailbox>
            <S.VerifyBtn
                type="button"
                onClick={handleOnClick}
                disabled={isEmailSended ? true : false}
                isEmailSended={isEmailSended}
            >
                이메일 인증하기
            </S.VerifyBtn>
            <S.CheckVerified
                onClick={handleCheck}
                type="button"
                disabled={isEmailSended ? false : true}
                isEmailSended={isEmailSended}
            >
                인증 확인하기
            </S.CheckVerified>
        </S.Emailbox>
    );
};

export default EmailVerify;
