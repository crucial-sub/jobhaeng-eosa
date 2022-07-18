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

const EditNickName = (props: Props) => {
    return (
        <S.NickNameInput>
            <label htmlFor="nickName">닉네임</label>
            <input
                name="nickName"
                type="text"
                id="nickName"
                value={props.userInfo.nickName}
                onChange={props.handleChange}
                placeholder="2글자 이상 6글자 이하"
                pattern="^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,6}$"
                required
            />
        </S.NickNameInput>
    );
};

export default EditNickName;
