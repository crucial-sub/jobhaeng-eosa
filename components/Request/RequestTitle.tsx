import React from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import * as S from './styles';

type Props = {
    request: ItemTypes;
};

const RequestTitle = (props: Props) => {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            requestAction.request({
                ...props.request,
                title: e.target.value,
            }),
        );
    };

    return (
        <S.TitleBox>
            <S.Input
                type="text"
                required
                onChange={handleChange}
                placeholder="제목"
            ></S.Input>
        </S.TitleBox>
    );
};

export default RequestTitle;
