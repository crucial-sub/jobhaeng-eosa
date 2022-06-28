import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { filterAction } from 'store';
import { PlaceCodeTypes } from './FilterContainer';

type Props = {
    townArray: PlaceCodeTypes[];
    setClickedTown: Dispatch<SetStateAction<string | undefined>>;
    clickedTown: string | undefined;
};

const Town = (props: Props) => {
    const { townArray, setClickedTown, clickedTown } = props;
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const town = e.currentTarget.dataset.town;
        setClickedTown(town);
    };
    return (
        <TownWrapper>
            {townArray &&
                townArray.map((town) => (
                    <TownItem
                        key={town.code}
                        data-town={town.name}
                        onClick={handleClick}
                        className={town.name === clickedTown ? 'clicked' : ''}
                    >
                        {town.name}
                    </TownItem>
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
    width: 90%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    &.clicked {
        background-color: burlywood;
    }
`;

export default Town;
