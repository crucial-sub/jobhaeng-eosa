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
import * as S from './styles';

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
    return <S.LogoutBtn onClick={handleClick}>로그아웃</S.LogoutBtn>;
};

export default Logout;
