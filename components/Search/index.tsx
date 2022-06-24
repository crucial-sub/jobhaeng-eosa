import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';
import SearchInput from './SearchInput';
import { useRouter } from 'next/router';

type Props = {};

const Search = (props: Props) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchValue) {
            router.push(`/search/searchValue="${searchValue}"`);
        } else {
            router.push('/');
        }
    };

    return (
        <SearchBox onSubmit={handleSubmit}>
            <SearchInput
                setSearchValue={setSearchValue}
                searchValue={searchValue}
            />
            <BsSearch />
        </SearchBox>
    );
};

const SearchBox = styled.form`
    position: relative;
    flex: 8 0 0;
    height: 100%;
    & svg {
        position: absolute;
        right: 7%;
        height: 100%;
        top: 0;
    }
`;

export default Search;
