import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { currentUserAction, RootState } from 'store';

type Props = {};

const EditUser = (props: Props) => {
    const router = useRouter();
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const [edittedUser, setEdittedUser] = useState(currentUser);
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(currentUserAction.user(edittedUser));
        router.push('/user');
    };

    return <EditForm onSubmit={handleSubmit}></EditForm>;
};

const EditForm = styled.form``;

export default EditUser;
