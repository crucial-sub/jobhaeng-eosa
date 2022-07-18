import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import FilterContainer from './FilterContainer';
import * as S from './styles';

type Props = {};

const Filter = (props: Props) => {
    const { filterInfo } = useSelector((state: RootState) => state.filter);
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            <S.FilterButton onClick={handleClick}>
                {filterInfo.name}
            </S.FilterButton>
            {isOpen && <FilterContainer setIsOpen={setIsOpen} />}
        </>
    );
};

export default Filter;
