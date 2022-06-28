import styled from '@emotion/styled';
import React, { RefObject } from 'react';
import { PlaceCodeTypes } from './FilterContainer';

type Props = {
    districtArray: PlaceCodeTypes[];
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    clickedDist: string;
};

const District = (props: Props) => {
    const { districtArray, handleClick, clickedDist } = props;
    return (
        <DistrictWrapper>
            {districtArray &&
                districtArray.map((dist) => (
                    <DistrictItem
                        key={dist.code}
                        data-code={dist.code}
                        data-name={dist.name}
                        onClick={handleClick}
                        className={dist.name === clickedDist ? 'clicked' : ''}
                    >
                        {dist.name}
                    </DistrictItem>
                ))}
        </DistrictWrapper>
    );
};

const DistrictWrapper = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
`;
const DistrictItem = styled.div`
    width: 90%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    &.clicked {
        background-color: burlywood;
    }
`;

export default District;
