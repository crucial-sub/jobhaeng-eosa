import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';

type Props = {
    request: ItemTypes;
};

const RequestReward = (props: Props) => {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            requestAction.request({
                ...props.request,
                reward: e.target.value,
            }),
        );
    };
    return (
        <>
            <Label>잡행 보상금</Label>
            <Input onChange={handleChange}></Input>
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default RequestReward;
