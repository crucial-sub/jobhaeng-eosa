import type { NextPage } from 'next';
import styled from '@emotion/styled';
import ItemList from 'components/ItemList';
import RequestBtn from 'components/Request/RequestBtn';

const Home: NextPage = () => {
    return (
        <ItemWrapper>
            <ItemList />
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
    background-color: aliceblue;
`;

export default Home;
