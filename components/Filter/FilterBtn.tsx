import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { getDistrict } from 'utils/fetcher';

type Props = {};

const FilterBtn = (props: Props) => {
    useEffect(() => {
        const getData = async () => {
            const { regcodes } = await getDistrict();
            console.log(regcodes);
        };
        getData();
    }, []);
    return <FilterButton>Filter</FilterButton>;
};

const FilterButton = styled.button`
    width: 20%;
    height: 100%;
    text-align: center;
    border: none;
`;

export default FilterBtn;
