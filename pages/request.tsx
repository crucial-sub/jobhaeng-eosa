import React from 'react';
import styled from '@emotion/styled';
import Request from 'components/Request';
import colors from 'styles/colors';

type Props = {};

const request = (props: Props) => {
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
    background-color: ${colors.white};
`;

export default request;
