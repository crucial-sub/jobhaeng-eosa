import styled from '@emotion/styled';
import { authService, dbService } from 'fbase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';

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
    margin-bottom: 50px;
    width: 100%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    border: none;
    background-color: skyblue;
    cursor: pointer;
`;

export default GoogleLogin;
