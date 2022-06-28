import styled from '@emotion/styled';
import React, { RefObject } from 'react';
import { PlaceCodeTypes } from './FilterContainer';

type Props = {
    districtArray: PlaceCodeTypes[];
    handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    distRef: RefObject<HTMLDivElement>;
};

const District = (props: Props) => {
    const { districtArray, handleClick, distRef } = props;
    return (
        <DistrictWrapper>
            {districtArray &&
                districtArray.map((dist) => (
                    <DistrictItem
                        key={dist.code}
                        data-code={dist.code}
                        onClick={handleClick}
                        ref={distRef}
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
    &.clicked {
        background-color: red;
    }
`;

export default District;
