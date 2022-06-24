import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

type Props = {};

const RequestBtn = (props: Props) => {
    return (
        <Link href={'/request'}>
            <Button>
                <AiFillPlusCircle />
            </Button>
        </Link>
    );
};

const Button = styled.div`
    position: absolute;
    bottom: 7%;
    right: 10%;

    & svg {
        color: green;
        font-size: 50px;
        cursor: pointer;
    }
`;

export default RequestBtn;
