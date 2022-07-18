import styled from '@emotion/styled';
import colors from 'styles/colors';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    & * {
        width: 100%;
    }
`;

export const Input = styled.input`
    padding: 1rem 0;
    background-color: ${colors.white};
    font-weight: 700;
`;
export const TextArea = styled.textarea`
    padding: 1rem 0;
    border: none;
    resize: none;
    background-color: ${colors.white};
    font-size: 1rem;
`;

export const RequestSubmit = styled.input`
    width: 100%;
    background-color: ${colors.gold};
    color: ${colors.lightDark};
    font-weight: bold;
    user-select: none;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    cursor: pointer;
`;

export const MapContainer = styled.div`
    max-width: 390px;
    height: 300px;
`;

export const Button = styled.div`
    position: absolute;
    bottom: 7%;
    right: 10%;
    & svg {
        color: #222831;
        font-size: 50px;
        cursor: pointer;
    }
`;

export const DetailBox = styled.div`
    > textarea {
        min-height: 9rem;
    }
`;

export const LocationBox = styled.div`
    margin: 1rem 0 0;

    > textarea {
        min-height: 4rem;
        border-bottom: 1px solid black;
    }
`;

export const LocationSelectTab = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const Tab = styled.div`
    width: 100%;
    text-align: center;
    background-color: ${colors.lightDark};
    color: ${colors.white};
    padding: 1rem;
    cursor: pointer;
    &.selected {
        background-color: ${colors.dark};
        color: ${colors.gold};
    }
`;
export const RewardBox = styled.div``;
export const TitleBox = styled.div`
    > input {
        padding-top: 0;
    }
`;
