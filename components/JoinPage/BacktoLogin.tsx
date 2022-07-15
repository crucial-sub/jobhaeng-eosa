import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { joinAction } from 'store';
import colors from 'styles/colors';

type Props = {};

const BacktoLogin = (props: Props) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(joinAction.join(false));
    };
    return <BackBtn onClick={handleClick}>로그인 하기</BackBtn>;
};

const BackBtn = styled.button`
    width: 90%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    margin: 0 auto 30px auto;
    background-color: ${colors.lightDark};
    border-radius: 20px;
    color: ${colors.gold};
    cursor: pointer;
`;

export default BacktoLogin;
