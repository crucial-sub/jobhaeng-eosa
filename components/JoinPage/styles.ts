import styled from '@emotion/styled';
import colors from 'styles/colors';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
`;
export const JoinBox = styled.div`
    width: 100%;
    height: 100%;
`;

export const RegistBox = styled.div`
    width: 100%;
    height: 100%;
`;

export const RegistTitle = styled.h1`
    width: 100%;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 15px;
`;

export const RegistForm = styled.form`
    display: flex;
    height: 50%;
    flex-direction: column;
    justify-content: center;
    & div {
        /* margin: 20px 20px; */
        width: 90%;
        display: flex;
    }
    & div > label {
        width: 20%;
        line-height: 30px;
    }
    & div > input {
        width: 80%;
        height: 4vh;
    }
`;

export const EmailInput = styled.div`
    position: relative;
    margin: 15px auto 30px auto;
    & label {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 4vh;
        height: 4vh;
        font-weight: 700;
    }
    & input {
        border-radius: 15px;
        height: 4vh;
    }
`;

export const PwInput = styled.div`
    margin: 0px auto 30px auto;
    & label {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4vh;
        line-height: 4vh;
        font-weight: 700;
    }
    & input {
        border-radius: 15px;
        height: 4vh;
    }
`;

export const ErrMessage = styled.h1`
    width: 90%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    margin: 0 auto 30px auto;
    background-color: ${colors.gold};
    color: ${colors.dark};
    border-radius: 15px;
`;

export const RegistBtn = styled.input`
    width: 90%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    margin: 0 auto 30px auto;
    background-color: ${colors.lightDark};
    border-radius: 20px;
    color: ${colors.gold};
    cursor: pointer;
`;

export const BackBtn = styled.button`
    width: 90%;
    height: 4vh;
    line-height: 4vh;
    text-align: center;
    margin: 0 auto 30px auto;
    background-color: ${colors.lightDark};
    border-radius: 20px;
    color: ${colors.gold};
    cursor: pointer;
`;
