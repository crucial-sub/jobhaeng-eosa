import styled from '@emotion/styled';
import { dbService } from 'fbase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import RequestDetail from './RequestDetail';
import RequestLocation from './RequestLocation';
import RequestReward from './RequestReward';
import RequestTitle from './RequestTitle';

type Props = {};

const Request = (props: Props) => {
    // const [request, setRequest] = useState({});
    const { request } = useSelector((state: RootState) => state.request);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const collectionRef = collection(dbService, 'items');
        const docRef = await addDoc(collectionRef, {
            ...request,
            date: serverTimestamp(),
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <RequestTitle request={request} />
            <RequestReward request={request} />
            <RequestLocation request={request} />
            <RequestDetail request={request} />
            <RequestSubmit type="submit" value="요청하기" />
        </Form>
    );
};

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const RequestSubmit = styled.input``;

export default Request;
