import styled from '@emotion/styled';
import { dbService } from 'fbase';
import {
    collection,
    query,
    where,
    doc,
    updateDoc,
    onSnapshot,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { currentUserAction, RootState, userDataTypes } from 'store';
import EditAddress from './EditAddress';
import EditEmail from './EditEmail';
import EditNickName from './EditNickName';
import EditPhoneNumber from './EditPhoneNumber';
import EmailVerify from './EmailVerify';

export interface addressTypes {
    address: string;
    detail: string;
    extra: string;
}

type Props = {};

const EditUserForm = (props: Props) => {
    const router = useRouter();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [userInfo, setUserInfo] = useState<userDataTypes>(currentUser);
    const [addressInfo, setAddressInfo] = useState<addressTypes>({
        address: '',
        detail: '',
        extra: '',
    });
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'nickName') {
            setUserInfo({ ...userInfo, nickName: value });
        } else if (name === 'phoneNumber') {
            setUserInfo({ ...userInfo, phoneNumber: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const collectionRef = collection(dbService, 'users');
        const q = query(collectionRef, where('uid', '==', currentUser.uid));
        e.preventDefault();
        if (confirm('정보를 수정하시겠습니까?')) {
            const fullAddress = `${addressInfo.address} ${addressInfo.detail} ${addressInfo.extra}`;
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach(async (document) => {
                    if (document.data().uid === currentUser.uid) {
                        const userRef = await updateDoc(
                            doc(dbService, 'users', document.id),
                            {
                                ...userInfo,
                                address: fullAddress,
                            },
                        );
                    }
                });
            });
            dispatch(
                currentUserAction.user({
                    ...userInfo,
                    address: fullAddress,
                }),
            );
        }
        router.push('/user');
    };

    useEffect(() => {
        setUserInfo(currentUser);
    }, [currentUser]);

    return (
        <EditForm onSubmit={handleSubmit}>
            <EditEmail handleChange={handleChange} userInfo={userInfo} />
            <EditNickName handleChange={handleChange} userInfo={userInfo} />
            <EditPhoneNumber handleChange={handleChange} userInfo={userInfo} />
            <EditAddress
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                addressInfo={addressInfo}
                setAddressInfo={setAddressInfo}
            />
            <EmailVerify />
        </EditForm>
    );
};

const EditForm = styled.form``;

export default EditUserForm;
