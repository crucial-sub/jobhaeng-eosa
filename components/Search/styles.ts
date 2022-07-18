import styled from '@emotion/styled';
import colors from 'styles/colors';

export const SearchBox = styled.form`
    position: relative;
    flex: 8 1 0;
    height: 100%;
    background-color: ${colors.white};
    & svg {
        position: absolute;
        right: 7%;
        height: 100%;
        top: 0;
    }
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    position: relative;
    text-align: center;
    border: none;
`;

export const PostBox = styled.div`
    display: grid;
    margin: 15px 5px;
    height: 5rem;
    cursor: pointer;
    background-color: #eeeeee;
    grid-template-columns: 1.5fr 1.5fr 1fr 2fr;
    grid-template-rows: 2fr 1fr 1fr;
    border: none;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
        rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    border-radius: 10px;
    padding: 1rem;
    gap: 0.1rem;
    color: ${colors.dark};

    & div:nth-of-type(1) {
        grid-column: 1 / 5;
        grid-row: 1 / 2;
        align-self: center;
        font-size: 1.2rem;
    }
    & div:nth-of-type(2) {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
        align-self: center;
        font-size: 0.8rem;
        color: ${colors.lightDark};
    }
    & div:nth-of-type(3) {
        grid-column: 1 / 3;
        grid-row: 3 / 4;
        align-self: center;
        font-size: 0.8rem;
        color: ${colors.lightDark};
    }
    & div:nth-of-type(4) {
        grid-column: 3 / 4;
        grid-row: 2 / 4;
        justify-content: center;
        align-self: center;
        display: flex;
        font-size: 0.8rem;
        background-color: ${colors.lightDark};
        border-radius: 5px;
        & span {
            max-width: 100%;
            margin: 0.4rem 0.2rem;
            color: ${colors.gold};
        }
    }
    & div:nth-of-type(5) {
        grid-column: 4 / 5;
        grid-row: 2 / 4;
        justify-self: center;
        align-self: center;
        font-size: 1.2rem;
    }
`;

export const NoResult = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    background-color: ${colors.lightDark};
    & span {
        font-size: 20px;
        text-align: center;
        color: ${colors.gold};
    }
`;
