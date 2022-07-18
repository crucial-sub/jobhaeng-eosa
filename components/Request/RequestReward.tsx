import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import { numberCommas, numberWithCommas } from 'utils/moneyFormat';
import * as S from './styles';

type Props = {
    request: ItemTypes;
};

const my = {
    maximumSignificantDigits: 10,
};

const RequestReward = (props: Props) => {
    const dispatch = useDispatch();
    const [money, setMoney] = useState('');
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
        <S.RewardBox>
            <S.Input
                type="text"
                placeholder="₩ 잡행보상금"
                required
                onChange={handleChange}
                value={money}
                pattern="^[0-9,₩]*$"
                maxLength={12}
            ></S.Input>
        </S.RewardBox>
    );
};

export default RequestReward;
