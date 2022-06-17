import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemTypes, RootState } from 'store';

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
                        <PostBox>
                            <div>{item.ongoing ? '진행 중' : null}</div>
                            <div>{item.title}</div>
                            <div>{item.location}</div>
                            <div>{item.date}</div>
                            <div>{item.reward}</div>
                        </PostBox>
                    </Link>
                ))
            ) : (
                <span>{searchValue} 검색 결과와 일치하는 요청이 없습니다.</span>
            )}
        </>
    );
};

const PostBox = styled.div`
    display: flex;
    margin: 20px;
    cursor: pointer;
`;

export default SearchResult;
