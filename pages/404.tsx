import styled from '@emotion/styled';
import colors from 'styles/colors';

export default function errorPage() {
    return (
        <ErrorBox>
            <h1>
                찾으시는 페이지가 없습니다
                <br />
                죄송합니다
            </h1>
        </ErrorBox>
    );
}

const ErrorBox = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    background-color: ${colors.lightDark};
    & h1 {
        font-size: 20px;
        text-align: center;
        color: ${colors.gold};
    }
`;
