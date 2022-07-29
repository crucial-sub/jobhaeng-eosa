import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import Request from 'components/Request';
import colors from 'styles/colors';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useRouter } from 'next/router';

type Props = {};

const RequestPage = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const router = useRouter();
    useEffect(() => {
        if (currentUser.email) {
            if (!currentUser.emailVerified) {
                if (
                    confirm(
                        '이메일 인증 후 내 동네와 닉네임을 설정해야만 요청글 작성이 가능합니다! 이메일 인증 페이지로 이동하시겠습니까?',
                    )
                )
                    router.push('/validate');
                else router.back();
            } else if (!currentUser.town || !currentUser.nickName) {
                if (
                    confirm(
                        '내 동네와 닉네임을 설정해야만 요청글 작성이 가능합니다! 프로필 수정 페이지로 이동하시겠습니까?',
                    )
                )
                    router.push('/user/edit');
                else router.back();
            }
        }
    }, [currentUser]);

    return (
        <>
            {currentUser.emailVerified &&
                currentUser.nickName &&
                currentUser.town &&
                currentUser.email && (
                    <RequestWrapper>
                        <Request />
                    </RequestWrapper>
                )}
        </>
    );
};

const RequestWrapper = styled.div`
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: ${colors.white};
`;

export default RequestPage;
