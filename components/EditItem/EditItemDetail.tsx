import React from 'react';
import { ItemTypes } from 'store';
import * as S from './styles';

type Props = {
    items: ItemTypes;
    handleChange: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    >;
};

const EditItemDetail = (props: Props) => {
    const { items, handleChange } = props;
    return (
        <S.DetailBox>
            <S.TextArea
                required
                data-info="contents"
                onChange={handleChange}
                value={items.contents}
                placeholder="잡행어사에게 요청할 내용을 작성해주세요."
            ></S.TextArea>
        </S.DetailBox>
    );
};

export default EditItemDetail;
