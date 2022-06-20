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
        <div>
            <label htmlFor="phoneNumber">핸드폰번호</label>
            <input
                name="phoneNumber"
                type="text"
                id="phoneNumber"
                value={props.userInfo.phoneNumber}
                onChange={props.handleChange}
                required
            />
        </div>
    );
};

export default EditPhoneNumber;
