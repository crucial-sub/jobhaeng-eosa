import React from 'react';
import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';

type Props = {};

const Search = (props: Props) => {
    return (
        <SearchBox>
            <SearchInput placeholder="검색어를 입력해주세요" />
            <BsSearch />
        </SearchBox>
    );
};

const SearchBox = styled.div`
    position: relative;
    width: 60%;
    height: 5vh;
    & svg {
        position: absolute;
        right: 5px;
        height: 6vh;
        top: -2px;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    height: 5vh;
    position: relative;
    text-align: center;
    border: none;
`;

export default Search;
