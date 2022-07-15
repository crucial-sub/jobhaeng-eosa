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

const EditItemDetail = (props: Props) => {
    const { items, handleChange } = props;
    return (
        <DetailBox>
            <TextArea
                required
                data-info="contents"
                onChange={handleChange}
                value={items.contents}
                placeholder="잡행어사에게 요청할 내용을 작성해주세요."
            ></TextArea>
        </DetailBox>
    );
};

const DetailBox = styled.div`
    > textarea {
        min-height: 9rem;
    }
`;
const TextArea = styled.textarea`
    padding: 1rem 0;
    border: none;
    resize: none;
    background-color: ${colors.white};
    font-size: 1rem;
`;

export default EditItemDetail;
