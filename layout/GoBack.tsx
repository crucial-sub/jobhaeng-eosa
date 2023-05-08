import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';
import { MdOutlineArrowBackIos } from 'react-icons/md';

type Props = {};

const GoBack = (props: Props) => {
    const router = useRouter();

    const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        router.back();
    };
    return (
        <BackBtn onClick={handleOnClick}>
            <MdOutlineArrowBackIos />
        </BackBtn>
    );
};

const BackBtn = styled.div`
    flex: 2 1 0;
    align-self: center;
    max-width: 20%;

    & svg {
        width: 100%;
        font-size: 2rem;
    }
`;

export default GoBack;
