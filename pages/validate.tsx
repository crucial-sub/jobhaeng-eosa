import EmailValidate from 'components/Mypage/EmailValidate';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { emailSendingAction, RootState } from 'store';

type Props = {};

const ValidatePage = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser.emailVerified) {
            alert('이메일 인증이 완료되었습니다!');
            dispatch(emailSendingAction.emailSending(false));
            router.push('/user');
        }
    }, [currentUser.emailVerified]);
    return (
        <>
            {!currentUser.emailVerified && currentUser.email && (
                <EmailValidate />
            )}
        </>
    );
};

export default ValidatePage;
