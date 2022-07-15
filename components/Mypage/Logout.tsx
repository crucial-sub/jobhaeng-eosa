import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
    currentUserAction,
    filterAction,
    joinAction,
    loginAction,
    persistor,
} from 'store';
import { authService } from 'fbase';
import { useRouter } from 'next/router';
import colors from 'styles/colors';

type Props = {};

const Logout = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleClick = async (event: React.MouseEvent<HTMLDivElement>) => {
        if (confirm('로그아웃 하시겠습니까?')) {
            authService.signOut();
            dispatch(loginAction.login(false));
            dispatch(currentUserAction.user(null));
            dispatch(joinAction.join(false));
            dispatch(
                filterAction.filter({
                    name: '',
                    code: '',
                    filteredItem: [],
                }),
            );
            await persistor.purge();
            router.push('/');
        } else return;
    };
    return <LogoutBtn onClick={handleClick}>로그아웃</LogoutBtn>;
};

const LogoutBtn = styled.div`
    width: 100%;
    background-color: ${colors.gold};
    color: ${colors.lightDark};
    font-weight: bold;
    user-select: none;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    cursor: pointer;
`;

export default Logout;
