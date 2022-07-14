import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from '@emotion/styled';
import Link from 'next/link';
import colors from 'styles/colors';
import { MdEmail, MdOutlinePhoneIphone } from 'react-icons/md';
import { ImHome } from 'react-icons/im';

type Props = {};

const MyInfo = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );

    return (
        <MyInfoBox>
            <MyInfoTop>
                <MyNickName>{currentUser?.nickName}</MyNickName>
                <Link href="/user/edit">
                    <EditBtn>프로필 수정</EditBtn>
                </Link>
            </MyInfoTop>
            <MyInfoBottom>
                <MyEmail>
                    <SvgBackground>
                        <MdEmail />
                    </SvgBackground>
                    <div>{currentUser?.email}</div>
                </MyEmail>
                <MyPhoneNumber>
                    <SvgBackground>
                        <MdOutlinePhoneIphone />
                    </SvgBackground>
                    <div>{currentUser?.phoneNumber}</div>
                </MyPhoneNumber>
                <MyAddress>
                    <SvgBackground>
                        <ImHome />
                    </SvgBackground>
                    <div>{currentUser?.address}</div>
                </MyAddress>
            </MyInfoBottom>
        </MyInfoBox>
    );
};

const MyInfoBox = styled.div`
    max-width: 100%;
    padding: 1rem;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;
const MyInfoTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;
const MyInfoBottom = styled.div`
    > div {
        display: flex;
        align-items: center;
        margin: 3px 0;
        > div > svg {
            color: ${colors.gold};
        }
    }
`;
const SvgBackground = styled.div`
    border-radius: 100%;
    background-color: ${colors.dark};
    width: fit-content;
    padding: 0.37rem;
    display: flex;
    align-items: center;
    margin-right: 0.4rem;
`;
const MyNickName = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.dark};
`;
const MyEmail = styled.div``;
const MyPhoneNumber = styled.div``;
const MyAddress = styled.div``;

const EditBtn = styled.div`
    background-color: ${colors.lightDark};
    color: ${colors.white};
    border-radius: 10px;
    padding: 7px;
    font-size: 0.8rem;
    user-select: none;
    cursor: pointer;

    :hover {
        color: ${colors.gold};
    }
`;
export default MyInfo;
