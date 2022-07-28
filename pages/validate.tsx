import EmailValidate from 'components/Mypage/EmailValidate';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {};

const validate = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const router = useRouter();

    useEffect(() => {
        if (currentUser.emailVerified) {
            alert('이미 이메일 인증이 완료되었습니다!');
            router.push('/user');
        }
    }, [currentUser.emailVerified]);
    return <>{!currentUser.emailVerified && <EmailValidate />}</>;
};

export default validate;
