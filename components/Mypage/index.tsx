import React from 'react';
import MyInfo from './MyInfo';
import Link from 'next/link';
import Logout from './Logout';
import MyItemList from './MyItemList';
import * as S from './styles';

type Props = {};

const MyPage = (props: Props) => {
    return (
        <S.MyPageContainer>
            <MyInfo />
            <MyItemList />
            <Link href="/">
                <Logout />
            </Link>
        </S.MyPageContainer>
    );
};

export default MyPage;
