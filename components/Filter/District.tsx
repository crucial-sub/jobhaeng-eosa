import React from 'react';
import { PlaceCodeTypes } from './FilterContainer';
import * as S from './styles';

type Props = {
    districtArray: PlaceCodeTypes[];
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    clickedDist: string;
};

const District = (props: Props) => {
    const { districtArray, handleClick, clickedDist } = props;
    return (
        <S.DistrictWrapper>
            {districtArray &&
                districtArray.map((dist) => (
                    <S.DistrictItem
                        key={dist.code}
                        data-code={dist.code}
                        data-name={dist.name}
                        onClick={handleClick}
                        className={dist.name === clickedDist ? 'clicked' : ''}
                    >
                        {dist.name}
                    </S.DistrictItem>
                ))}
        </S.DistrictWrapper>
    );
};

export default District;
