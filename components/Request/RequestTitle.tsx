import styled from '@emotion/styled';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import colors from 'styles/colors';

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
        <TitleBox>
            <Input
                type="text"
                required
                onChange={handleChange}
                placeholder="제목"
            ></Input>
        </TitleBox>
    );
};
const TitleBox = styled.div`
    > input {
        padding-top: 0;
    }
`;
const Input = styled.input`
    padding: 1rem 0;
    border-bottom: 1px solid black;
    background-color: ${colors.white};
    font-weight: 700;
`;

export default RequestTitle;
