import React from 'react';
import MyInfo from './MyInfo';
import Link from 'next/link';

import Logout from './Logout';
import MyItemList from './MyItemList';

type Props = {};

const MyPage = (props: Props) => {
    return (
        <div>
            <MyInfo />
            <MyItemList />
            <Link href="/">
                <Logout />
            </Link>
        </div>
    );
};

export default MyPage;
