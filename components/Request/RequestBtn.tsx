import Link from 'next/link';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import * as S from './styles';

type Props = {};

const RequestBtn = (props: Props) => {
    return (
        <Link href={'/request'}>
            <S.Button>
                <AiFillPlusCircle />
            </S.Button>
        </Link>
    );
};

export default RequestBtn;
