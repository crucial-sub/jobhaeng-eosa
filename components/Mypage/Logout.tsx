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

type Props = {};

const Logout = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
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
    };
    return <LogoutBtn onClick={handleClick}>Logout</LogoutBtn>;
};

const LogoutBtn = styled.button`
    position: relative;
    width: 20%;
    height: 100%;
    text-align: center;
    border: none;
    cursor: pointer;
    user-select: none;
`;

export default Logout;
