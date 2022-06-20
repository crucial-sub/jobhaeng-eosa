import React from 'react';
import { userDataTypes } from 'store';

type Props = {
    handleChange: React.ChangeEventHandler<HTMLInputElement>;
    userInfo: userDataTypes;
};

const EditNickName = (props: Props) => {
    return (
        <div>
            <label htmlFor="nickName">닉네임</label>
            <input
                name="nickName"
                type="text"
                id="nickName"
                value={props.userInfo.nickName}
                onChange={props.handleChange}
                required
            />
        </div>
    );
};

export default EditNickName;
