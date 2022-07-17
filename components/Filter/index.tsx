import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import FilterContainer from './FilterContainer';

type Props = {};

const Filter = (props: Props) => {
    const { filterInfo } = useSelector((state: RootState) => state.filter);
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <FilterButton onClick={handleClick}>{filterInfo.name}</FilterButton>
            {isOpen && <FilterContainer setIsOpen={setIsOpen} />}
        </>
    );
};

const FilterButton = styled.button`
    flex: 2 0 0;
    height: 100%;
    text-align: center;
    border: none;
    cursor: pointer;
    user-select: none;
`;

export default Filter;
