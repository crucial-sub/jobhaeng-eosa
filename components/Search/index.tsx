import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';
import SearchInput from './SearchInput';
import { useRouter } from 'next/router';
import colors from 'styles/colors';

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
    const handleClick = (e: React.MouseEvent<SVGAElement>) => {
        if (searchValue) {
            router.push(`/search/searchValue="${searchValue}"`);
        } else return;
    };

    return (
        <SearchBox onSubmit={handleSubmit}>
            <SearchInput
                setSearchValue={setSearchValue}
                searchValue={searchValue}
            />
            <BsSearch onClick={handleClick} />
        </SearchBox>
    );
};

const SearchBox = styled.form`
    position: relative;
    flex: 8 1 0;
    height: 100%;
    background-color: ${colors.white};
    & svg {
        position: absolute;
        right: 7%;
        height: 100%;
        top: 0;
    }
`;

export default Search;
