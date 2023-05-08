import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';
import * as S from './styles';

type Props = {};

const SearchResult = (props: Props) => {
    const router = useRouter();
    const [searchResult, setSearchResult] = useState<ItemTypes[]>([]);
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const searchValue = router.query.searchValue?.slice(13, -1);
    useEffect(() => {
        if (!router.isReady) return;
        if (typeof searchValue === 'string') {
            const filtResult = itemList.filter((item) => {
                const regex = new RegExp(searchValue, 'gi');
                return item.title?.match(regex) || item.contents?.match(regex);
            });
            setSearchResult(() => [...filtResult]);
        }
    }, [router.isReady, router]);

    return (
        <>
            {searchResult.length ? (
                searchResult.map((item) => (
                    <Link key={item.id} href={`/items/${item.id}`}>
                        <S.PostBox>
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
                        </S.PostBox>
                    </Link>
                ))
            ) : (
                <S.NoResult>
                    <span>{searchValue}에 해당하는 검색 결과가 없습니다.</span>
                </S.NoResult>
            )}
        </>
    );
};

export default SearchResult;
