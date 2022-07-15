import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import colors from 'styles/colors';
import { numberCommas } from 'utils/moneyFormat';

type Props = {
    request: ItemTypes;
};

const my = {
    maximumSignificantDigits: 10,
};

const RequestReward = (props: Props) => {
    const dispatch = useDispatch();
    const [money, setMoney] = useState('');
    const numberWithCommas = (reward: string) => {
        const first = reward.replace(/,/g, '').replace(/[^0-9]/g, '');
        const final = Number(first).toLocaleString('ko-KR').toString();
        return final;
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueWithCommas = numberWithCommas(e.currentTarget.value);
        const removeCommas = valueWithCommas.replace(/,/g, '');
        const reward = numberCommas(removeCommas.toString());
        setMoney(reward!);
        dispatch(
            requestAction.request({
                ...props.request,
                reward: reward,
            }),
        );
    };
    return (
        <RewardBox>
            <Input
                type="text"
                placeholder="₩ 잡행보상금"
                required
                onChange={handleChange}
                value={money}
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

export default RequestReward;
