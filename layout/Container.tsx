import { GlobalLayoutProps } from 'types/GlobalLayoutProps';
import styled from '@emotion/styled';

const Container = ({ children }: GlobalLayoutProps) => {
    return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 390px;
    height: 844px;
    background-color: tomato;
`;

export default Container;
