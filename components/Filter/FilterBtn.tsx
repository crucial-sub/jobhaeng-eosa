import React from 'react';
import styled from '@emotion/styled';

type Props = {};

const FilterBtn = (props: Props) => {
    return <FilterButton>Filter</FilterButton>;
};

const FilterButton = styled.button`
    width: 20%;
    line-height: 5vh;
    text-align: center;
    border: none;
`;

export default FilterBtn;
