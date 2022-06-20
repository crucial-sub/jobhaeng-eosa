import Document, {
    DocumentContext,
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <script
                        type="text/javascript"
                        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=287ffecf2171baeaf8539863aa7ad6c1&autoload=false&libraries=services"
                    ></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
