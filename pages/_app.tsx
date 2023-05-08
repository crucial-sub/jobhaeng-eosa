import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Container from 'layout/Container';
import Header from 'layout/Header';
import ContentsBox from 'layout/ContentsBox';
import Footer from 'layout/Footer';
import {
    currentUserAction,
    loginAction,
    persistedReducer,
    persistor,
    RootState,
    wrapper,
} from 'store';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LoginJoin from 'components/LoginJoin';
import { dbService } from 'fbase';
import { createStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import {
    collection,
    DocumentData,
    onSnapshot,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';
import TopLogo from 'layout/TopLogo';
import { useRouter } from 'next/router';
import Head from 'next/head';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const router = useRouter();
    const { pathname } = router;
    const store = createStore(persistedReducer);
    const [userUid, setUserUid] = useState('');
    const dispatch = useDispatch();
    const { checkLogin } = useSelector((state: RootState) => state.login);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserUid(user.uid);
                dispatch(loginAction.login(true));
                dispatch(
                    currentUserAction.user({
                        ...currentUser,
                        email: user.email,
                        uid: user.uid,
                        emailVerified: user.emailVerified,
                    }),
                );
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (userUid) {
            const collectionRef = collection(dbService, 'users');
            const q = query(collectionRef, where('uid', '==', userUid));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const userArray = querySnapshot.docs.map(
                    (doc: QueryDocumentSnapshot<DocumentData>) => ({
                        ...doc.data(),
                    }),
                );
                dispatch(
                    currentUserAction.user({ ...currentUser, ...userArray[0] }),
                );
            });
            return unsubscribe;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userUid]);

    return (
        <PersistGate persistor={persistor} loading={<div>loading...</div>}>
            <Head>
                {' '}
                <title>잡행어사</title>
            </Head>
            <Container>
                {checkLogin ? (
                    <>
                        <TopLogo />
                        <Header pathname={pathname} />
                        <ContentsBox>
                            <Component {...pageProps} />
                        </ContentsBox>
                        <Footer />
                    </>
                ) : (
                    <>
                        <TopLogo />
                        <LoginJoin />
                    </>
                )}
            </Container>
        </PersistGate>
    );
};

export default wrapper.withRedux(MyApp);
