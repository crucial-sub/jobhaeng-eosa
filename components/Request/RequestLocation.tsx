import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';

type Props = {
    request: ItemTypes;
};

const RequestLocation = (props: Props) => {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            requestAction.request({
                ...props.request,
                location: e.target.value,
            }),
        );
    };
    return (
        <>
            <Label>잡행어사 출두 위치</Label>
            <Input onChange={handleChange}></Input>
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default RequestLocation;
