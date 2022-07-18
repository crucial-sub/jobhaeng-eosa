import React from 'react';
import * as S from './styles';

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
        <S.EmailInput>
            <label htmlFor="email">이메일</label>
            <input
                name="email"
                type="text"
                id="email"
                value={props.userInfo.email}
                onChange={props.handleChange}
                readOnly
            />
        </S.EmailInput>
    );
};

export default EditEmail;
