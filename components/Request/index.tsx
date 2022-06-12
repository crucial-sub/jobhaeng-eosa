import styled from '@emotion/styled';
import { dbService } from 'fbase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    ItemTypes,
    requestAction,
    requestInitialState,
    RootState,
} from 'store';
import RequestDetail from './RequestDetail';
import RequestLocation from './RequestLocation';
import RequestReward from './RequestReward';
import RequestTitle from './RequestTitle';
import { useRouter } from 'next/router';

type Props = {};

const Request = (props: Props) => {
    const dispatch = useDispatch();
    const { request } = useSelector((state: RootState) => state.request);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (confirm('잡행어사 출두를 요청하시겠습니까?')) {
            const collectionRef = collection(dbService, 'items');
            const docRef = await addDoc(collectionRef, {
                ...request,
                date: serverTimestamp(),
            });
            dispatch(requestAction.request(requestInitialState.request));
            router.push('/');
        } else return;
    };

    return (
        <Form onSubmit={handleSubmit}>
            <RequestTitle request={request} />
            <RequestReward request={request} />
            <RequestLocation request={request} />
            <RequestDetail request={request} />
            <RequestSubmit type="submit" value="잡행 요청하기" />
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const RequestSubmit = styled.input``;

export default Request;
