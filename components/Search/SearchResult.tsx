import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {};

const SearchResult = (props: Props) => {
    const router = useRouter();
    const searchValue = router.query.searchValue?.slice(13, -1);
    const { searchResult } = useSelector((state: RootState) => state.search);

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
