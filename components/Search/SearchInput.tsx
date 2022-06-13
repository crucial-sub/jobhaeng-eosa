import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';

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
        <Input
            placeholder="검색어를 입력해주세요"
            onChange={handleChange}
            value={props.searchValue}
        ></Input>
    );
};

const Input = styled.input`
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    border: none;
`;

export default SearchInput;
