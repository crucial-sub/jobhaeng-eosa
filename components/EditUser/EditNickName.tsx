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
