import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Container from 'layout/Container';
import Header from 'layout/Header';
import ContentsBox from 'layout/ContentsBox';
import Footer from 'layout/Footer';
import { loginAction, persistedReducer, RootState, wrapper } from 'store';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Login from './login';
import Join from './join';
import { useRouter } from 'next/router';
import Loading from 'components/Loading';
import LoginJoin from 'components/LoginJoin';
import { createStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    const router = useRouter();
    const path = router.pathname;
    const dispatch = useDispatch();
    const { clickJoin } = useSelector((state: RootState) => state.join);
    const { checkLogin } = useSelector((state: RootState) => state.login);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(loginAction.login(true));
            }
        });
    }, []);
    return (
        <PersistGate persistor={persistor} loading={<div>loading...</div>}>
            <Container>
                {checkLogin ? (
                    <>
                        <Header />
                        <ContentsBox>
                            <Component {...pageProps} />
                        </ContentsBox>
                        <Footer />
                    </>
                ) : (
                    <LoginJoin />
                )}
            </Container>
        </PersistGate>
    );
};

export default wrapper.withRedux(MyApp);
