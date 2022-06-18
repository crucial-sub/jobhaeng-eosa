import styled from '@emotion/styled';
import { dbService } from 'fbase';
import { update } from 'firebase/database';
import {
    addDoc,
    collection,
    query,
    where,
    doc,
    updateDoc,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { currentUserAction, currentUserInitialState, RootState } from 'store';

type Props = {};

const EditUser = (props: Props) => {
    const router = useRouter();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [edittedUser, setEdittedUser] = useState(currentUser);
    const [userInfos, setUserInfos] = useState();
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = e;
        if (name === 'email') {
            dispatch(
                currentUserAction.user({
                    ...currentUser,
                    email: value,
                }),
            );
        } else if (name === 'nickName') {
            dispatch(
                currentUserAction.user({
                    ...currentUser,
                    nickName: value,
                }),
            );
        } else if (name === 'phoneNumber') {
            dispatch(
                currentUserAction.user({
                    ...currentUser,
                    phoneNumber: value,
                }),
            );
        } else if (name === 'address') {
            dispatch(
                currentUserAction.user({
                    ...currentUser,
                    address: value,
                }),
            );
        }
    };
    console.log(currentUser);
    const collectionRef = collection(dbService, 'users');
    const q = query(collectionRef, where('uid', '==', currentUser.uid));
    console.log(q);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm('정보를 수정하시겠습니까?')) {
            const collectionRef = collection(dbService, 'users');
            if (q) {
            } else if (!q) {
                const docRef = await addDoc(collectionRef, {
                    ...currentUser,
                });
            }
            dispatch(
                currentUserAction.user(currentUserInitialState.currentUser),
            );
            router.push(`/`);
        }
        // dispatch(currentUserAction.user(edittedUser));
        router.push('/user');
    };

    return (
        <EditForm onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">이메일</label>
                <input
                    name="email"
                    type="text"
                    id="email"
                    value={currentUser.email}
                    onChange={handleChange}
                    readOnly
                />
            </div>
            <div>
                <label htmlFor="nickName">닉네임</label>
                <input
                    name="nickName"
                    type="text"
                    id="nickName"
                    value={currentUser.nickName ? currentUser.nickName : ' '}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="phoneNumber">핸드폰번호</label>
                <input
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    value={
                        currentUser.phoneNumber ? currentUser.phoneNumber : ' '
                    }
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="address">주소</label>
                <input
                    name="address"
                    type="text"
                    id="address"
                    value={currentUser.address ? currentUser.address : ' '}
                    onChange={handleChange}
                    required
                />
            </div>
            <input type="submit" value={'update User'} />
        </EditForm>
    );
};

const EditForm = styled.form``;

export default EditUser;
