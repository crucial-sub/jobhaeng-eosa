import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';

type Props = {
    request: ItemTypes;
};

const RequestDetail = (props: Props) => {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
            requestAction.request({
                ...props.request,
                contents: e.target.value,
            }),
        );
    };
    return (
        <>
            <Label>잡행 내용</Label>
            <TextArea required onChange={handleChange}></TextArea>
        </>
    );
};

const Label = styled.label``;

const TextArea = styled.textarea``;

export default RequestDetail;
