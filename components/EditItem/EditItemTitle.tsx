import React from 'react';
import { ItemTypes } from 'store';
import * as S from './styles';

type Props = {
    items: ItemTypes;
    handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    >;
};

const EditItemTitle = (props: Props) => {
    const { items, handleChange } = props;
    return (
        <S.TitleBox>
            <S.Input
                type="text"
                required
                data-info="title"
                onChange={handleChange}
                placeholder="제목"
                value={items.title}
            ></S.Input>
        </S.TitleBox>
    );
};

export default EditItemTitle;
