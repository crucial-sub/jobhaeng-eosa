import styled from '@emotion/styled';
import React from 'react';

type Props = {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    userInfo: {
        uid: string;
        nickName?: string;
        email: string;
        address?: string;
        phoneNumber?: string;
    };
};

const EditPhoneNumber = (props: Props) => {
    return (
        <PhoneNumberInput>
            <label htmlFor="phoneNumber">연락처</label>
            <input
                name="phoneNumber"
                type="text"
                id="phoneNumber"
                value={props.userInfo.phoneNumber}
                onChange={props.handleChange}
                required
            />
        </PhoneNumberInput>
    );
};

export default EditPhoneNumber;

const PhoneNumberInput = styled.div`
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
