import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from '@emotion/styled';

type Props = {};

const MyInfo = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    return (
        <>
            <Information>나의 정보</Information>
            <MyInfoBox>
                <div>{currentUser.email}</div>
                <div>{currentUser.nickName}</div>
                <div>{currentUser.phoneNumber}</div>
                <div>{currentUser.address}</div>
            </MyInfoBox>
        </>
    );
};

const Information = styled.h1`
    font-size: 2rem;
    width: 100%;
    text-align: center;
    padding: 15px 0;
`;

const MyInfoBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: skyblue;
    & div {
        line-height: 30px;
    }
`;

export default MyInfo;
