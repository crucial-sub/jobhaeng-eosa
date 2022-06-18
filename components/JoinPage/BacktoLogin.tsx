import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { joinAction } from 'store';

type Props = {};

const BacktoLogin = (props: Props) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(joinAction.join(false));
    };
    return <BackBtn onClick={handleClick}>로그인 하기</BackBtn>;
};

const BackBtn = styled.button`
    margin-top: 50px;
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    border: none;
    background-color: skyblue;
    cursor: pointer;
`;

export default BacktoLogin;
