import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { requestAction } from 'store';

type Props = {};

const RequestTitle = (props: Props) => {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(requestAction.request({ title: e.target.value }));
    };

    return (
        <>
            <Label>제목</Label>
            <Input onChange={handleChange}></Input>
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default RequestTitle;
