import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import FilterContainer from './FilterContainer';

type Props = {};

const Filter = (props: Props) => {
    const { currentUser } = useSelector(
        (state: RootState) => state.currentUser,
    );
    const { town } = useSelector((state: RootState) => state.filter);
    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen((prev) => !prev);
    };
    const [currentTown, setCurrentTown] = useState<string>();
    useEffect(() => {
        setCurrentTown(currentUser.town);
    }, [currentUser]);

    return (
        <>
            <FilterButton onClick={handleClick}>
                {town ? town : currentTown}
            </FilterButton>
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
`;

export default Filter;
