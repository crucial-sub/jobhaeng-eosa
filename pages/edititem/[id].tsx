import React from 'react';
import EditItem from 'components/EditItem';
import styled from '@emotion/styled';
import colors from 'styles/colors';

type Props = {};

const ItemEdit = (props: Props) => {
    return (
        <EditItemWrapper>
            <EditItem />
        </EditItemWrapper>
    );
};

const EditItemWrapper = styled.div`
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: ${colors.white};
`;

export default ItemEdit;
