import React from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import * as S from './styles';

type Props = {
    request: ItemTypes;
};

const RequestDetail = (props: Props) => {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
            requestAction.request({
                ...props.request,
                contents: e.target.value,
            }),
        );
    };
    return (
        <S.DetailBox>
            <S.TextArea
                required
                onChange={handleChange}
                placeholder="잡행어사에게 요청할 내용을 작성해주세요."
            ></S.TextArea>
        </S.DetailBox>
    );
};

export default RequestDetail;
