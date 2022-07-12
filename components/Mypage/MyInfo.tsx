import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from '@emotion/styled';
import Link from 'next/link';
import colors from 'styles/colors';

type Props = {};

const MyInfo = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    return (
        <>
            <Information>나의 정보</Information>
            <MyInfoBox>
                <div>{currentUser?.email}</div>
                <div>{currentUser?.nickName}</div>
                <div>{currentUser?.phoneNumber}</div>
                <div>{currentUser?.address}</div>
            </MyInfoBox>
            <Link href="/user/edit">
                <EditBtn>수정하기</EditBtn>
            </Link>
        </>
    );
};

const Information = styled.h1`
    font-size: 2rem;
    width: 100%;
    text-align: center;
    padding: 15px 0;
    color: #222831;
`;

const MyInfoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    & div {
        line-height: 30px;
    }
`;

const EditBtn = styled.div`
    width: 100%;
    background-color: #393e46;
    color: ${colors.gold};
    font-weight: bold;
    user-select: none;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    cursor: pointer;
`;
export default MyInfo;
