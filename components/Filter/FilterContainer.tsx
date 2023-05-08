import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterAction, RootState } from 'store';
import { getDistrict, getTown } from 'utils/fetcher';
import District from './District';
import Town from './Town';
import * as S from './styles';

type Props = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export interface PlaceCodeTypes {
    code: string;
    name: string;
    district: string;
}

const FilterContainer = (props: Props) => {
    const { setIsOpen } = props;
    const { filterInfo } = useSelector((state: RootState) => state.filter);
    const [districtArray, setDistrictArray] = useState([]);
    const [townArray, setTownArray] = useState<PlaceCodeTypes[]>([]);
    const [clickedTown, setClickedTown] = useState<PlaceCodeTypes>({
        name: '',
        code: '',
        district: '',
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
                    district: targetName,
                };
                const towns = regcodes
                    .slice(1)
                    .map((town: PlaceCodeTypes) => {
                        return {
                            ...town,
                            name: town.name.split(' ')[2],
                            district: targetName,
                        };
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
        const d = document.getElementById('clicked-dist');
        d?.click();
    }, [clickedDist]);

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
            setClickedDist(filterInfo.district);
        };
        getData();
    }, []);
    const selectTown = () => {
        if (!clickedTown.name) {
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
        <S.FilterWrapper>
            <S.FilterList>
                <District
                    districtArray={districtArray}
                    handleClick={handleClick}
                    clickedDist={clickedDist}
                />
                <Town
                    townArray={townArray}
                    setClickedTown={setClickedTown}
                    clickedTown={clickedTown}
                    clickedDist={clickedDist}
                />
            </S.FilterList>
            <S.ApplyBtn onClick={selectTown}>적용하기</S.ApplyBtn>
        </S.FilterWrapper>
    );
};

export default FilterContainer;
