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

const EditItemTitle = (props: Props) => {
    const { items, handleChange } = props;
    return (
        <TitleBox>
            <Input
                type="text"
                required
                data-info="title"
                onChange={handleChange}
                placeholder="제목"
                value={items.title}
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

export default EditItemTitle;
