import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import SearchInput from './SearchInput';
import { useRouter } from 'next/router';
import * as S from './styles';

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
        <S.SearchBox onSubmit={handleSubmit}>
            <SearchInput
                setSearchValue={setSearchValue}
                searchValue={searchValue}
            />
            <BsSearch onClick={handleClick} />
        </S.SearchBox>
    );
};

export default Search;
