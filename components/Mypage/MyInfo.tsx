import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Link from 'next/link';
import { MdEmail, MdOutlinePhoneIphone } from 'react-icons/md';
import { ImHome } from 'react-icons/im';
import * as S from './styles';
import { useRouter } from 'next/router';

type Props = {};

const MyInfo = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!currentUser.emailVerified) {
            confirm(
                '이메일 인증 유저만 프로필 수정이 가능합니다! 이메일 인증 페이지로 이동하시겠습니까?',
            ) && router.push('/validate');
        } else router.push('/user/edit');
    };

    return (
        <S.MyInfoBox>
            <S.MyInfoTop>
                <S.MyNickName>
                    {currentUser.nickName
                        ? currentUser.nickName
                        : '닉네임 미설정'}
                </S.MyNickName>
                {currentUser.emailVerified ? (
                    <div>이메일 인증 완료</div>
                ) : (
                    <Link href={'/validate'}>
                        <S.EmailValidateBtn>이메일 인증</S.EmailValidateBtn>
                    </Link>
                )}
                <S.EditBtn onClick={handleClick}>프로필 수정</S.EditBtn>
            </S.MyInfoTop>
            <S.MyInfoBottom>
                <S.MyEmail>
                    <S.SvgBackground>
                        <MdEmail />
                    </S.SvgBackground>
                    <div>{currentUser?.email}</div>
                </S.MyEmail>
                <S.MyPhoneNumber>
                    <S.SvgBackground>
                        <MdOutlinePhoneIphone />
                    </S.SvgBackground>
                    <div>
                        {currentUser.phoneNumber
                            ? currentUser.phoneNumber
                            : '전화번호를 등록해주세요!'}
                    </div>
                </S.MyPhoneNumber>
                <S.MyAddress>
                    <S.SvgBackground>
                        <ImHome />
                    </S.SvgBackground>
                    <div>
                        {currentUser.address
                            ? currentUser.address
                            : '주소를 등록해주세요!'}
                    </div>
                </S.MyAddress>
            </S.MyInfoBottom>
        </S.MyInfoBox>
    );
};

export default MyInfo;
