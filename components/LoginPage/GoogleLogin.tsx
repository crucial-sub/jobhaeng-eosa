import styled from '@emotion/styled';
import { authService, dbService } from 'fbase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import colors from 'styles/colors';

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
        <GoogleLoginBtn onClick={onSocailClick} name="google">
            구글 로그인
        </GoogleLoginBtn>
    );
};
const GoogleLoginBtn = styled.button`
    width: 90%;
    height: 4vh;
    line-height: 4vh;
    margin: 0 auto 30px auto;
    text-align: center;
    border: none;
    background-color: ${colors.lightDark};
    color: ${colors.gold};
    cursor: pointer;
    border-radius: 20px;
`;

export default GoogleLogin;
