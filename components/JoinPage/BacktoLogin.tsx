import React from 'react';
import { useDispatch } from 'react-redux';
import { joinAction } from 'store';
import * as S from './styles';

type Props = {};

const BacktoLogin = (props: Props) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(joinAction.join(false));
    };
    return <S.BackBtn onClick={handleClick}>로그인 하기</S.BackBtn>;
};

export default BacktoLogin;
