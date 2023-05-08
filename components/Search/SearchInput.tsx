import React, { Dispatch, SetStateAction } from 'react';
import * as S from './styles';

type Props = {
    setSearchValue: Dispatch<SetStateAction<string>>;
    searchValue: string;
};

const SearchInput = (props: Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        props.setSearchValue(val);
    };

    return (
        <S.Input
            placeholder="검색어를 입력해주세요"
            onChange={handleChange}
            value={props.searchValue}
        ></S.Input>
    );
};

export default SearchInput;
