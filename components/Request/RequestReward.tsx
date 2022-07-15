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
    const handleChange = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.KeyboardEvent<HTMLInputElement>,
    ) => {
        const value = numberWithCommas(e.currentTarget.value);
        setMoney(value);
        const num = value.replace(/,/g, '');

        dispatch(
            requestAction.request({
                ...props.request,
                reward: numberCommas(num.toString()),
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
                onKeyDown={handleChange}
                value={money}
                pattern="^[0-9,]*$"
                maxLength={11}
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
