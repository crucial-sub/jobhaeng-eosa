import React, { useState } from 'react';
import styled from '@emotion/styled';
import { BsSearch } from 'react-icons/bs';
import SearchInput from './SearchInput';
import { useDispatch } from 'react-redux';
import { RootState, searchAction } from 'store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

type Props = {};

const Search = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchValue) {
            const searchResult = itemList.filter((item) => {
                const regex = new RegExp(searchValue, 'gi');
                return item.title?.match(regex) || item.contents?.match(regex);
            });
            dispatch(searchAction.search(searchResult));
            setSearchValue('');
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
    width: 60%;
    height: 100%;
    & svg {
        position: absolute;
        right: 7%;
        height: 100%;
        top: 0;
    }
`;

export default Search;
