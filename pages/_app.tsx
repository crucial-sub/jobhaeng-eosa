import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Container from 'layout/Container';
import Header from 'layout/Header';
import ContentsBox from 'layout/ContentsBox';
import Footer from 'layout/Footer';
import { loginAction, RootState, wrapper } from 'store';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Login from './login';
import Join from './join';
import { useRouter } from 'next/router';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    const path = router.pathname;
    console.log(path);
    const dispatch = useDispatch();
    const { checkLogin } = useSelector((state: RootState) => state.login);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            console.log('user', user);
            if (user) {
                dispatch(loginAction.login(!checkLogin));
            } else {
                dispatch(loginAction.login(false));
            }
        });
    }, []);
    console.log('dd', checkLogin);
    return (
        <Container>
            {checkLogin === false ? (
                <Login />
            ) : checkLogin === null ? (
                <>Loading</>
            ) : (
                <>
                    <Header />
                    <ContentsBox>
                        <Component {...pageProps} />
                    </ContentsBox>
                    <Footer />
                </>
            )}
        </Container>
    );
};

export default wrapper.withRedux(MyApp);
