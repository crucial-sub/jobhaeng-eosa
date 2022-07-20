import styled from '@emotion/styled';
import colors from 'styles/colors';

export const MyPageContainer = styled.div`
    position: relative;
    height: 100%;
`;

export const LogoutBtn = styled.div`
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

export const MyInfoBox = styled.div`
    max-width: 100%;
    padding: 1rem;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    margin-bottom: 2rem;
`;
export const MyInfoTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;
export const MyInfoBottom = styled.div`
    > div {
        display: flex;
        align-items: center;
        margin: 3px 0;
        > div > svg {
            color: ${colors.gold};
        }
    }
`;
export const SvgBackground = styled.div`
    border-radius: 100%;
    background-color: ${colors.dark};
    width: fit-content;
    padding: 0.37rem;
    display: flex;
    align-items: center;
    margin-right: 0.4rem;
`;
export const MyNickName = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${colors.dark};
`;
export const MyEmail = styled.div``;
export const MyPhoneNumber = styled.div``;
export const MyAddress = styled.div``;

export const EditBtn = styled.div`
    background-color: ${colors.lightDark};
    color: ${colors.white};
    border-radius: 10px;
    padding: 7px;
    font-size: 0.8rem;
    user-select: none;
    cursor: pointer;

    :hover {
        color: ${colors.gold};
    }
`;

export const MyListContainer = styled.div``;
export const SelectTab = styled.div<{ selectedList: string }>`
    display: flex;
    border-bottom: 1px solid ${colors.dark};
    > div {
        margin: 0 1rem 1rem;
        cursor: pointer;
    }
    .selected {
        position: relative;
        font-weight: 700;
        ::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 3px;
            bottom: -1rem;
            left: 0;
            background-color: ${colors.dark};
            border-radius: 10px;
        }
    }
`;

export const ItemBox = styled.div`
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

export const NoList = styled.div`
    margin: 15px;
`;
