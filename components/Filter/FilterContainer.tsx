import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { filterAction } from 'store';
import { getDistrict, getTown } from 'utils/fetcher';
import District from './District';
import Town from './Town';

type Props = {};

export interface PlaceCodeTypes {
    code: string;
    name: string;
}

const FilterContainer = (props: Props) => {
    const distRef = useRef<HTMLDivElement>(null);
    const [districtArray, setDistrictArray] = useState([]);
    const [townArray, setTownArray] = useState<PlaceCodeTypes[]>([]);
    const [clickedTown, setClickedTown] = useState<string | undefined>();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetCode = e.currentTarget.id;
        const getData = async () => {
            const { regcodes } = await getTown(targetCode);
            const district = {
                ...regcodes[0],
                name: `${regcodes[0].name.split(' ')[1]} 전체`,
            };
            const towns = regcodes
                .slice(1)
                .map((town: PlaceCodeTypes) => {
                    return { ...town, name: town.name.split(' ')[2] };
                })
                .sort((a: PlaceCodeTypes, b: PlaceCodeTypes) =>
                    a.name > b.name ? 1 : -1,
                );
            setTownArray([district, ...towns]);
        };
        getData();
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
    return (
        <FilterWrapper>
            <FilterList>
                <District
                    districtArray={districtArray}
                    handleClick={handleClick}
                    distRef={distRef}
                />
                <Town townArray={townArray} setClickedTown={setClickedTown} />
            </FilterList>
            <ApplyBtn>적용하기</ApplyBtn>
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
    flex-direction: column;
`;

const FilterList = styled.div`
    flex: 9 0 0;
    display: flex;
    overflow: auto;
`;
const ApplyBtn = styled.div`
    flex: 1 0 0;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    background-color: bisque;
`;

export default FilterContainer;
