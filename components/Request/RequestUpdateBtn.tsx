import React from 'react';
import styled from '@emotion/styled';

type Props = {};

const RequestUpdateBtn = (props: Props) => {
    const handleOnClick = () => {};
    return <DeleteBtn onClick={handleOnClick}>수정</DeleteBtn>;
};

const DeleteBtn = styled.button`
    width: 50px;
    height: 30px;
`;

export default RequestUpdateBtn;
