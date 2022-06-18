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

const EditAddress = (props: Props) => {
    return (
        <div>
            <label htmlFor="address">주소</label>
            <input
                name="address"
                type="text"
                id="address"
                value={props.userInfo.address}
                onChange={props.handleChange}
                required
            />
        </div>
    );
};

export default EditAddress;
