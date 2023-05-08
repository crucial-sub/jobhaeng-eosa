import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import * as S from './styles';

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
                        <S.ItemBox>
                            <div>{item.title?.slice(0, 16)}</div>
                            <div>{item.town}</div>
                            <div>{item.date}</div>
                            <div>
                                {item.ongoing ? (
                                    item.requestEnd ? (
                                        <span>완료 !</span>
                                    ) : (
                                        <span>진행 중</span>
                                    )
                                ) : null}
                            </div>
                            <div>{item.reward}</div>
                        </S.ItemBox>
                    </Link>
                ))
            ) : (
                <S.NoList>잡행어사 출두 내역이 없습니다.</S.NoList>
            )}
        </div>
    );
};

export default MyJobHangList;
