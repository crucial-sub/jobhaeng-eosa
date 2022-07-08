import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterAction, RootState } from 'store';
import { getDistrict, getTown } from 'utils/fetcher';
import District from './District';
import Town from './Town';

type Props = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export interface PlaceCodeTypes {
    code: string;
    name: string;
}

const FilterContainer = (props: Props) => {
    const { setIsOpen } = props;
    const [districtArray, setDistrictArray] = useState([]);
    const [townArray, setTownArray] = useState<PlaceCodeTypes[]>([]);
    const [clickedTown, setClickedTown] = useState<PlaceCodeTypes>({
        name: '',
        code: '',
    });
    const [clickedDist, setClickedDist] = useState('');
    const { itemList } = useSelector((state: RootState) => state.itemList);
    const dispatch = useDispatch();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetCode = e.currentTarget.dataset.code;
        const targetName = e.currentTarget.dataset.name;
        if (targetCode) {
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
        }
        if (targetName) {
            setClickedDist(targetName);
        }
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
    const selectTown = () => {
        if (!clickedTown) {
            alert('동을 선택해 주세요!');
            return;
        }
        let newList = [...itemList];
        if (clickedTown.name.match('전체')) {
            newList = itemList.filter((item) =>
                townArray.some((town) => town.name === item.town),
            );
        } else {
            newList = itemList.filter((item) => item.town === clickedTown.name);
        }
        const newFilter = {
            ...clickedTown,
            filteredItem: newList,
        };

        dispatch(filterAction.filter(newFilter));
        setIsOpen(false);
    };
    return (
        <FilterWrapper>
            <FilterList>
                <District
                    districtArray={districtArray}
                    handleClick={handleClick}
                    clickedDist={clickedDist}
                />
                <Town
                    townArray={townArray}
                    setClickedTown={setClickedTown}
                    clickedTown={clickedTown}
                />
            </FilterList>
            <ApplyBtn onClick={selectTown}>적용하기</ApplyBtn>
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
    cursor: pointer;
`;

export default FilterContainer;
