import styled from '@emotion/styled';
import React from 'react';

type Props = {};

const RequestDetail = (props: Props) => {
    return (
        <>
            <Label>잡행 내용</Label>
            <TextArea></TextArea>
        </>
    );
};

const Label = styled.label``;

const TextArea = styled.textarea``;

export default RequestDetail;
