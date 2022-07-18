import React, { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState, tabAction } from 'store';
import * as S from './styles';

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <S.TabBox>
            {tabArr.map((tab, i) => (
                <Link key={i} href={`${tab[1]}`}>
                    <S.TabItem
                        data-path={tab[1]}
                        className={tab[1] === currentTab ? 'clicked' : ''}
                    >
                        {tab[0]}
                    </S.TabItem>
                </Link>
            ))}
        </S.TabBox>
    );
};

export default Tab;
