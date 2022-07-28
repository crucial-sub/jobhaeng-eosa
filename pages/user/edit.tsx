import EditUser from 'components/EditUser';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {};

const EditPage = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const router = useRouter();
    if (!currentUser.emailVerified) {
        if (
            confirm(
                '이메일 인증 유저만 프로필 수정이 가능합니다! 이메일 인증 페이지로 이동하시겠습니까?',
            )
        ) {
            return router.push('/validate');
        } else return router.back();
    }
    return <EditUser />;
};

export default EditPage;
