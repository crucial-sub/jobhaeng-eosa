import styled from '@emotion/styled';
import colors from 'styles/colors';

export const EditForm = styled.form`
    width: 100%;
    height: 100%;
    & div {
        margin-top: 20px;
    }
`;

export const FormTitle = styled.div`
    width: 90%;
    font-size: 2rem;
    margin: auto;
`;
export const EmailInput = styled.div`
    margin: auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    & label {
        line-height: 30px;
    }
    & input {
        width: 80%;
        height: 30px;
    }
`;
export const NickNameInput = styled.div`
    margin: auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    & label {
        line-height: 30px;
    }
    & input {
        width: 80%;
        height: 30px;
    }
`;

export const PhoneNumberInput = styled.div`
    margin: auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    & label {
        line-height: 30px;
    }
    & input {
        width: 80%;
        height: 30px;
    }
`;

export const AddressContainer = styled.div`
    margin: auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    & div {
        width: 100%;
        display: flex;
        margin-top: 10px;
        & span {
            width: 20%;
            line-height: 30px;
        }
    }
`;

export const AddressTitle = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2rem;
    margin: auto;
`;

export const Find = styled.button`
    width: 80%;
    height: 30px;
    background-color: ${colors.lightDark};
    color: ${colors.white};
    font-weight: 700;
    border-radius: 10px;
`;

export const RefAddress = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & div {
        height: 30px;
        justify-content: space-between;
        & label {
            line-height: 30px;
        }
    }
`;

export const ShowFind = styled.input`
    width: 80%;
`;

export const DetailAddress = styled.input`
    width: 80%;
`;

export const ExtraAddress = styled.input`
    width: 80%;
`;

export const postCodeStyle = {
    width: '390px',
    height: '300px',
};

export const Wrap = styled.div`
    border: 1px solid;
    width: 390px;
    height: 300px;
    margin: 5px 0;
    position: relative;
`;
export const CloseImg = styled.img`
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: -20px;
    z-index: 1;
`;

export const Emailbox = styled.div`
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-around;
`;

export const VerifyBtn = styled.button`
    width: 33%;
`;

export const CheckVerified = styled.button`
    width: 33%;
    height: 40px;
    border-radius: 15px;
    background-color: ${colors.lightDark};
    color: ${colors.gold};
`;

export const UpdateUser = styled.input`
    width: 33%;
    height: 40px;
    border-radius: 15px;
    background-color: ${colors.gold};
    color: ${colors.dark};
`;
