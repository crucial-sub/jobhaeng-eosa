import { GlobalLayoutProps } from 'types/GlobalLayoutProps';
import styled from '@emotion/styled';

const ContentsBox = ({ children }: GlobalLayoutProps) => {
    return <ContentsWrapper>{children}</ContentsWrapper>;
};

const ContentsWrapper = styled.div`
    max-width: 100%;
    flex: 7.5 1 0;
`;

export default ContentsBox;
