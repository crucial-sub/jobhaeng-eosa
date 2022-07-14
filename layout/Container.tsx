import { GlobalLayoutProps } from 'types/GlobalLayoutProps';
import styled from '@emotion/styled';

const Container = ({ children }: GlobalLayoutProps) => {
    return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 390px;
    height: 100vh;
    max-height: 100vh;
    background-color: #eeeeee;
`;

export default Container;
