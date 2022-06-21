import React from 'react';
import { ItemTypes } from 'store';
import styled from '@emotion/styled';

type Props = {
    item: ItemTypes;
};

const ItemEdit = (props: Props) => {
    const { item } = props;

    return (
        <ItemWrapper>
            <input value={item.title} />
            <input value={item.nickName} />
            <input value={item.location} />
            <input value={item.contents} />
            <input value={item.reward} />
            <input value={item.date} />
        </ItemWrapper>
    );
};

const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: aliceblue;
`;

export default ItemEdit;
