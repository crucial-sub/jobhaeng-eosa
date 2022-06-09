import 'styles/globals.css';
import type { AppProps } from 'next/app';
import Container from 'layout/Container';
import Header from 'layout/Header';
import ContentsBox from 'layout/ContentsBox';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Container>
            <Header />
            <ContentsBox>
                <Component {...pageProps} />
            </ContentsBox>
        </Container>
    );
};

export default MyApp;
