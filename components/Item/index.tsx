import styled from '@emotion/styled';
import RequestEditDltBtn from 'components/Request/RequestEditDltBtn';
import React from 'react';
import { ItemTypes } from 'store';

type Props = {
    item: ItemTypes;
};

const Item = (props: Props) => {
    const { item } = props;
    return (
        <>
            <ItemWrapper>
                <div>{item.title}</div>
                <div>{item.location}</div>
                <div>{item.date}</div>
                <div>{item.contents}</div>
                <div>{item.reward}</div>
                <RequestEditDltBtn word={'수정'} />
                <RequestEditDltBtn word={'삭제'} />
            </ItemWrapper>
        </>
    );
};

const ItemWrapper = styled.div`
    position: relative;
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: aliceblue;
`;

export default Item;
