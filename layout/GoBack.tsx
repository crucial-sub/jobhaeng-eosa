import styled from '@emotion/styled';
import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

type Props = {};

const GoBack = (props: Props) => {
    return (
        <BackBtn>
            <MdOutlineArrowBackIos />
        </BackBtn>
    );
};

const BackBtn = styled.div`
    flex: 2 0 0;
    align-self: center;
    max-width: 20%;

    & svg {
        width: 100%;
        font-size: 2rem;
    }
`;

export default GoBack;
