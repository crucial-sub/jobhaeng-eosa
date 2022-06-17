import React from 'react';
import styled from '@emotion/styled';
import FilterBtn from 'components/Filter/FilterBtn';
import SearchBox from 'components/Search';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { currentUserAction, loginAction, RootState } from 'store';
import { authService } from 'fbase';
import { useDispatch } from 'react-redux';
import { persistor } from 'store';

type Props = {};

const Header = (props: Props) => {
    const { checkLogin } = useSelector((state: RootState) => state.login);
    const dispatch = useDispatch();
    const onClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        authService.signOut();
        dispatch(loginAction.login(false));
        dispatch(currentUserAction.user(null));
        await persistor.purge();
    };
    return (
        <HeaderContainer>
            <Title>잡행어사</Title>
            <HeaderBox>
                <FilterBtn />
                <SearchBox />
                {checkLogin ? (
                    <Link href="/">
                        <Logout onClick={onClick}>Logout</Logout>
                    </Link>
                ) : (
                    <Link href="/login">
                        <Login>Login</Login>
                    </Link>
                )}
            </HeaderBox>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    width: 100%;
    flex: 1.5 1 0;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    width: 100%;
    height: 6vh;
    padding: 1vh 0;
    line-height: 6vh;
    text-align: center;
    font-size: 35px;
    background-color: skyblue;
`;

const HeaderBox = styled.div`
    height: 100%;
    display: flex;
    width: 100%;
`;

const Login = styled.button`
    position: relative;
    width: 20%;
    height: 100%;
    text-align: center;
    border: none;
`;

const Logout = styled.button`
    position: relative;
    width: 20%;
    height: 100%;
    text-align: center;
    border: none;
`;

export default Header;
