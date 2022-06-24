import styled from '@emotion/styled';
import React from 'react';
import { PlaceCodeTypes } from './FilterContainer';

type Props = {
    districtArray: PlaceCodeTypes[];
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const District = (props: Props) => {
    const { districtArray, handleClick } = props;
    return (
        <DistrictWrapper>
            {districtArray &&
                districtArray.map((dist) => (
                    <DistrictItem
                        key={dist.code}
                        id={dist.code}
                        onClick={handleClick}
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
    margin: 10px;
`;

export default District;
