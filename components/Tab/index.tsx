import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, tabAction } from 'store';

type Props = {};

const Tab = (props: Props) => {
    const tabArr = [
        ['글', '/'],
        ['채팅', '/chats'],
        ['마이페이지', '/user'],
    ];
    const dispatch = useDispatch();
    const { currentTab } = useSelector((state: RootState) => state.tab);
    const [clicked, setClicked] = useState('');
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        if (tabArr.some((tab) => tab[1] === pathname)) {
            dispatch(tabAction.tab(pathname));
        }
    }, [pathname]);

    return (
        <TabBox>
            {tabArr.map((tab, i) => (
                <Link key={i} href={`${tab[1]}`}>
                    <TabItem
                        data-path={tab[1]}
                        className={tab[1] === currentTab ? 'clicked' : ''}
                    >
                        {tab[0]}
                    </TabItem>
                </Link>
            ))}
        </TabBox>
    );
};

const TabBox = styled.div`
    flex: 1 1 0;
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    text-align: center;
    cursor: pointer;
    user-select: none;
    display: flex;
    z-index: 10;
`;

const TabItem = styled.div`
    flex: 1 1 0;
`;

export default Tab;
