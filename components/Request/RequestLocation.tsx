import styled from '@emotion/styled';
import React from 'react';

type Props = {};

const RequestLocation = (props: Props) => {
    return (
        <>
            <Label>잡행어사 출두 위치</Label>
            <Input></Input>
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default RequestLocation;
