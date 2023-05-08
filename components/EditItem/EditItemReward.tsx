import React from 'react';
import { ItemTypes } from 'store';
import * as S from './styles';

type Props = {
    items: ItemTypes;
    handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    >;
};

const EditItemReward = (props: Props) => {
    const { items, handleChange } = props;
    return (
        <S.RewardBox>
            <S.Input
                type="text"
                placeholder="₩ 잡행보상금"
                data-info="reward"
                required
                onChange={handleChange}
                value={items.reward}
                pattern="^[0-9,₩]*$"
                maxLength={12}
            ></S.Input>
        </S.RewardBox>
    );
};

export default EditItemReward;
