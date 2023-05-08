import React, { Dispatch, SetStateAction } from 'react';
import { PlaceCodeTypes } from './FilterContainer';
import * as S from './styles';

type Props = {
    townArray: PlaceCodeTypes[];
    setClickedTown: Dispatch<SetStateAction<PlaceCodeTypes>>;
    clickedTown: PlaceCodeTypes;
    clickedDist: string;
};

const Town = (props: Props) => {
    const { townArray, setClickedTown, clickedTown, clickedDist } = props;
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const town = e.currentTarget.dataset.town;
        const code = e.currentTarget.dataset.code;
        setClickedTown({ name: town!, code: code!, district: clickedDist });
    };
    return (
        <S.TownWrapper>
            {townArray &&
                townArray.map((town) => (
                    <S.TownItem
                        key={town.code}
                        data-town={town.name}
                        data-code={town.code}
                        onClick={handleClick}
                        className={
                            town.name === clickedTown.name ? 'clicked' : ''
                        }
                    >
                        {town.name}
                    </S.TownItem>
                ))}
        </S.TownWrapper>
    );
};

export default Town;
