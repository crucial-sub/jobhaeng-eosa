import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Link from 'next/link';
import * as S from './styles';

type Props = {};

const MyRequestList = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const RequestList = itemList.filter(
        (data) => data.userId === currentUser?.uid,
    );

    return (
        <div>
            {RequestList.length > 0 ? (
                RequestList.map((item) => {
                    return (
                        <Link href={`/items/${item.id}`} key={item.id}>
                            <S.ItemBox>
                                <div>{item.title}</div>
                                <div>{item.town}</div>
                                <div>{item.date}</div>
                                <div>{item.reward}</div>
                            </S.ItemBox>
                        </Link>
                    );
                })
            ) : (
                <S.NoList>요청 내역이 없습니다.</S.NoList>
            )}
        </div>
    );
};

export default MyRequestList;
