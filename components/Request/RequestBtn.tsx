import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import * as S from './styles';

type Props = {};

const RequestBtn = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!currentUser.emailVerified) {
            confirm(
                '이메일 인증 후 내 동네와 닉네임을 설정해야만 요청글 작성이 가능합니다! 이메일 인증 페이지로 이동하시겠습니까?',
            ) && router.push('/validate');
        } else if (!currentUser.town || !currentUser.nickName) {
            confirm(
                '내 동네와 닉네임을 설정해야만 요청글 작성이 가능합니다! 프로필 수정 페이지로 이동하시겠습니까?',
            ) && router.push('/user/edit');
        } else router.push('/request');
    };
    return (
        <S.Button onClick={handleClick}>
            <AiFillPlusCircle />
        </S.Button>
    );
};

export default RequestBtn;
