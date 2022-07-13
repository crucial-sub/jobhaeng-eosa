import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import { userDataTypes } from 'store';

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

const EditEmail = (props: Props) => {
    return (
        <EmailInput>
            <label htmlFor="email">이메일</label>
            <input
                name="email"
                type="text"
                id="email"
                value={props.userInfo.email}
                onChange={props.handleChange}
                readOnly
            />
        </EmailInput>
    );
};

export default EditEmail;

const EmailInput = styled.div`
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
