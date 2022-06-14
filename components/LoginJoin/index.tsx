import Join from 'pages/join';
import Login from 'pages/login';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from 'store';

type Props = {};

const LoginJoin = (props: Props) => {
    const dispatch = useDispatch();
    const { clickJoin } = useSelector((state: RootState) => state.join);
    return <>{clickJoin ? <Join /> : <Login />}</>;
};

export default LoginJoin;
