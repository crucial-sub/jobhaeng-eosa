import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {};

const Tab = (props: Props) => {
    const tabArr = [
        ['글', '/'],
        ['채팅', '/chats'],
        ['마이페이지', '/user'],
    ];
    const [clicked, setClicked] = useState('');
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        if (pathname) setClicked(pathname);
    }, [pathname]);

    return (
        <>
            {tabArr.map((tab, i) => (
                <Link key={i} href={`${tab[1]}`}>
                    <TabBox
                        data-path={tab[1]}
                        className={tab[1] === clicked ? 'clicked' : ''}
                    >
                        {tab[0]}
                    </TabBox>
                </Link>
            ))}
        </>
    );
};

const TabBox = styled.div`
    flex: 1 1 0;
    width: 100%;
    height: 10vh;
    line-height: 10vh;
    text-align: center;
    cursor: pointer;
`;

export default Tab;
