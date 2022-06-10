import { GlobalLayoutProps } from 'types/GlobalLayoutProps';
import styled from '@emotion/styled';

const Container = ({ children }: GlobalLayoutProps) => {
    return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 390px;
    height: 844px;
    max-height: 100vh;
    background-color: tomato;
    position: relative;
`;

export default Container;
