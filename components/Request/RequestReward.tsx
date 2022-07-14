import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
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
        <>
            <Label>잡행 보상금</Label>
            <Input
                type="text"
                placeholder="숫자만 입력해주세요"
                required
                onChange={handleChange}
                onKeyDown={handleChange}
                value={money}
                pattern="^[0-9,]*$"
                maxLength={11}
            ></Input>
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default RequestReward;
