import styled from '@emotion/styled';
import React from 'react';
import { PlaceCodeTypes } from './FilterContainer';

type Props = {
    townArray: PlaceCodeTypes[];
};

const Town = (props: Props) => {
    const { townArray } = props;
    return (
        <TownWrapper>
            {townArray &&
                townArray.map((town) => (
                    <TownItem key={town.code}>{town.name}</TownItem>
                ))}
        </TownWrapper>
    );
};

const TownWrapper = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
`;
const TownItem = styled.div`
    margin: 6px;
    justify-content: center;
`;

export default Town;
