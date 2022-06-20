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
        <div>
            <label htmlFor="email">이메일</label>
            <input
                name="email"
                type="text"
                id="email"
                value={props.userInfo.email}
                onChange={props.handleChange}
                readOnly
            />
        </div>
    );
};

export default EditEmail;
