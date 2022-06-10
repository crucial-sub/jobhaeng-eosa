import type { NextPage } from 'next';
import styled from '@emotion/styled';
import ItemList from 'components/ItemList/ItemList';

const Home: NextPage = () => {
    return (
        <ItemWrapper>
            <ItemList />
        </ItemWrapper>
    );
};

const ItemWrapper = styled.div`
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: aliceblue;
`;

export default Home;
