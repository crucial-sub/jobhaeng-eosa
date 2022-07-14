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

const EditNickName = (props: Props) => {
    return (
        <NickNameInput>
            <label htmlFor="nickName">닉네임</label>
            <input
                name="nickName"
                type="text"
                id="nickName"
                value={props.userInfo.nickName}
                onChange={props.handleChange}
                required
            />
        </NickNameInput>
    );
};

export default EditNickName;

const NickNameInput = styled.div`
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
