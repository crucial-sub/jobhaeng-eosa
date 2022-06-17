import JoinPage from 'components/JoinPage';
import LoginPage from 'components/LoginPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {};

const LoginJoin = (props: Props) => {
    const { clickJoin } = useSelector((state: RootState) => state.join);
    return <>{clickJoin ? <JoinPage /> : <LoginPage />}</>;
};

export default LoginJoin;
