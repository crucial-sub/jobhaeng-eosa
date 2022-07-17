import React from 'react';
import MyInfo from './MyInfo';
import Link from 'next/link';
import Logout from './Logout';
import MyItemList from './MyItemList';
import styled from '@emotion/styled';

type Props = {};

const MyPage = (props: Props) => {
    return (
        <MyPageContainer>
            <MyInfo />
            <MyItemList />
            <Link href="/">
                <Logout />
            </Link>
        </MyPageContainer>
    );
};

const MyPageContainer = styled.div`
    position: relative;
    height: 100%;
`;

export default MyPage;
