import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import Request from 'components/Request';

type Props = {};

const request = (props: Props) => {
    const dispatch = useDispatch();

    return (
        <RequestWrapper>
            <Request />
        </RequestWrapper>
    );
};

const RequestWrapper = styled.div`
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: aliceblue;
`;

export default request;
