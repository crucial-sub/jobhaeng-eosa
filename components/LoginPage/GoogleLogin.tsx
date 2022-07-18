import { authService, dbService } from 'fbase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import * as S from './styles';

type Props = {};

const GoogleLogin = (props: Props) => {
    const router = useRouter();
    const onSocailClick = async (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        const provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider);
        const uid = data.user.uid;
        const collectionRef = collection(dbService, 'users');
        const docsRef = await getDocs(collectionRef);
        const isExist = docsRef.docs.some((doc) => doc.data().uid === uid);
        if (!isExist) {
            const docRef = await addDoc(collectionRef, {
                uid: uid,
                email: data.user.email,
            });
            router.push('/user/edit');
        }
    };
    return (
        <S.GoogleLoginBtn onClick={onSocailClick} name="google">
            구글 로그인
        </S.GoogleLoginBtn>
    );
};

export default GoogleLogin;
