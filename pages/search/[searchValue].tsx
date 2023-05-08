import styled from '@emotion/styled';
import RequestBtn from 'components/Request/RequestBtn';
import SearchResult from 'components/Search/SearchResult';
import React from 'react';
import colors from 'styles/colors';

type Props = {};

const search = (props: Props) => {
    return (
        <ItemWrapper>
            <SearchResult />
            <RequestBtn />
        </ItemWrapper>
    );
};

const ItemWrapper = styled.div`
    position: relative;
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: ${colors.white};
`;

export default search;
