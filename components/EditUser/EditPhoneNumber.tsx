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

const EditPhoneNumber = (props: Props) => {
    return (
        <S.PhoneNumberInput>
            <label htmlFor="phoneNumber">연락처</label>
            <input
                name="phoneNumber"
                type="text"
                id="phoneNumber"
                value={props.userInfo.phoneNumber}
                onChange={props.handleChange}
                pattern="01[016789]-?[^0][0-9]{2,3}-?[0-9]{3,4}"
                required
            />
        </S.PhoneNumberInput>
    );
};

export default EditPhoneNumber;
