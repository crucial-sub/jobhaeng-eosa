import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import colors from 'styles/colors';

type Props = {};

const MyJobHangList = (props: Props) => {
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const jobHangList = itemList.filter(
        (item) => item.jobHangASa === currentUser.uid,
    );

    return (
        <div>
            {jobHangList.length > 0 ? (
                jobHangList.map((item) => (
                    <Link href={`/items/${item.id}`} key={item.id}>
                        <ItemBox>
                            <div>{item.title}</div>
                            <div>{item.town}</div>
                            <div>{item.date}</div>
                            <div>{item.reward}</div>
                        </ItemBox>
                    </Link>
                ))
            ) : (
                <NoList>잡행어사 출두 내역이 없습니다.</NoList>
            )}
        </div>
    );
};

const Information = styled.h1`
    font-size: 2rem;
    width: 100%;
    text-align: center;
    padding: 15px 0;
`;

const ItemBox = styled.div`
    display: grid;
    margin: 15px 5px;
    height: 5rem;
    cursor: pointer;
    background-color: #eeeeee;
    grid-template-columns: 1.5fr 1.5fr 1fr 2fr;
    grid-template-rows: 2fr 1fr 1fr;
    border: none;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    border-radius: 10px;
    padding: 1rem;
    gap: 0.1rem;
    color: ${colors.dark};

    & div:nth-of-type(1) {
        grid-column: 1 / 5;
        grid-row: 1 / 2;
        align-self: center;
        font-size: 1.2rem;
    }
    & div:nth-of-type(2) {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
        align-self: center;
        font-size: 0.8rem;
        color: ${colors.lightDark};
    }
    & div:nth-of-type(3) {
        grid-column: 1 / 3;
        grid-row: 3 / 4;
        align-self: center;
        font-size: 0.8rem;
        color: ${colors.lightDark};
    }
    & div:nth-of-type(4) {
        grid-column: 4 / 5;
        grid-row: 2 / 4;
        justify-self: center;
        align-self: center;
        font-size: 1.2rem;
    }
`;

const NoList = styled.div`
    margin: 15px;
`;

export default MyJobHangList;
