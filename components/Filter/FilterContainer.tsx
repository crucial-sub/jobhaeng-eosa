import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { getDistrict, getTown } from 'utils/fetcher';
import District from './District';
import Town from './Town';

type Props = {};

export interface PlaceCodeTypes {
    code: string;
    name: string;
}

const FilterContainer = (props: Props) => {
    const [districtArray, setDistrictArray] = useState([]);
    const [districtCode, setDistrictCode] = useState<string>();
    const [townArray, setTownArray] = useState<PlaceCodeTypes[]>([]);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetCode = e.currentTarget.id;
        setDistrictCode(targetCode);
    };
    useEffect(() => {
        const getData = async () => {
            const { regcodes } = await getDistrict();
            const districtCodes = await regcodes
                .slice(1)
                .map((district: PlaceCodeTypes) => {
                    const sliceCode = district.code.slice(2, 4);
                    const sliceDistrict = district.name.split(' ')[1];
                    return { code: sliceCode, name: sliceDistrict };
                })
                .sort((a: PlaceCodeTypes, b: PlaceCodeTypes) =>
                    a.name > b.name ? 1 : -1,
                );
            setDistrictArray(districtCodes);
        };
        getData();
    }, []);
    useEffect(() => {
        if (!districtCode) return;
        const getData = async () => {
            const { regcodes } = await getTown(districtCode);
            const district = {
                ...regcodes[0],
                name: `${regcodes[0].name.split(' ')[1]} 전체`,
            };
            const towns = await regcodes
                .map((town: PlaceCodeTypes) => {
                    return { ...town, name: town.name.split(' ')[2] };
                })
                .sort((a: PlaceCodeTypes, b: PlaceCodeTypes) =>
                    a.name > b.name ? 1 : -1,
                );

            setTownArray([district, ...towns]);
        };
        getData();
    }, [districtCode]);
    return (
        <FilterWrapper>
            <District districtArray={districtArray} handleClick={handleClick} />
            <Town townArray={townArray} />
        </FilterWrapper>
    );
};

const FilterWrapper = styled.div`
    position: absolute;
    top: 7.5vh;
    right: 0;
    display: flex;
    width: 390px;
    height: 85vh;
    background-color: azure;
    z-index: 1;
`;

export default FilterContainer;
