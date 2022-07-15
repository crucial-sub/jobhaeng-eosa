import styled from '@emotion/styled';
import React from 'react';
import { ItemTypes } from 'store';
import colors from 'styles/colors';

type Props = {
    items: ItemTypes;
    handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    >;
};

const EditItemReward = (props: Props) => {
    const { items, handleChange } = props;
    return (
        <RewardBox>
            <Input
                type="text"
                placeholder="₩ 잡행보상금"
                data-info="reward"
                required
                onChange={handleChange}
                value={items.reward}
                pattern="^[0-9,₩]*$"
                maxLength={12}
            ></Input>
        </RewardBox>
    );
};

const RewardBox = styled.div``;
const Input = styled.input`
    padding: 1rem 0;
    border-bottom: 1px solid black;
    background-color: ${colors.white};
    font-weight: 700;
`;

export default EditItemReward;
