import React from 'react';
import MyInfo from './MyInfo';
import MyRequest from './MyRequest';
import Link from 'next/link';

import Logout from './Logout';
import MyJabHangList from './MyJabHangList';

type Props = {};

const MyPage = (props: Props) => {
    return (
        <div>
            <MyInfo />
            <MyRequest />
            <MyJabHangList />
            <Link href="/">
                <Logout />
            </Link>
        </div>
    );
};

export default MyPage;
