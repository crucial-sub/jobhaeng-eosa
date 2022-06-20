import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { userDataTypes } from 'store';
import { addressTypes } from './EditUser';

type Props = {
    userInfo: userDataTypes;
    setUserInfo: Dispatch<SetStateAction<userDataTypes>>;
    addressInfo: addressTypes;
    setAddressInfo: Dispatch<SetStateAction<addressTypes>>;
};

const EditAddress = (props: Props) => {
    const { userInfo, setUserInfo, setAddressInfo, addressInfo } = props;
    const [visible, setVisible] = useState(false);
    const handleComplete = (data: any) => {
        if (data.sido !== '서울') {
            alert('현재 서울 지역에서만 서비스 중입니다!! 다시 골라주세요!!');
            setVisible(false);
            return;
        }
        setUserInfo({
            ...userInfo,
            town: data.bname,
        });
        setAddressInfo({
            ...addressInfo,
            address: data.address,
        });

        setVisible(false);
    };

    const sample3_execDaumPostcode = () => {
        setVisible(true);
    };

    const foldDaumPostcode = () => {
        setVisible(false);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'detail') {
            setAddressInfo({ ...addressInfo, detail: value });
        } else if (name === 'extra') {
            setAddressInfo({ ...addressInfo, extra: value });
        }
    };

    return (
        <div>
            <input
                type="button"
                onClick={sample3_execDaumPostcode}
                value="주소 찾기"
            />
            <br />
            <input
                type="text"
                id="sample3_address"
                placeholder="주소"
                required
                value={addressInfo.address}
            />
            <br />
            <input
                type="text"
                id="sample3_detailAddress"
                name="detail"
                placeholder="상세주소"
                required
                value={addressInfo.detail}
                onChange={handleChange}
            />
            <input
                type="text"
                id="sample3_extraAddress"
                name="extra"
                placeholder="참고항목"
                value={addressInfo.extra}
                onChange={handleChange}
            ></input>
            {visible ? (
                <Wrap id="wrap">
                    <CloseImg
                        src="//t1.daumcdn.net/postcode/resource/images/close.png"
                        id="btnFoldWrap"
                        onClick={foldDaumPostcode}
                        alt="접기 버튼"
                    />
                    <DaumPostcode
                        onComplete={handleComplete}
                        style={postCodeStyle}
                    />
                </Wrap>
            ) : null}
        </div>
    );
};

const postCodeStyle = {
    width: '390px',
    height: '300px',
};

const Wrap = styled.div`
    border: 1px solid;
    width: 390px;
    height: 300px;
    margin: 5px 0;
    position: relative;
`;
const CloseImg = styled.img`
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: -20px;
    z-index: 1;
`;

export default EditAddress;
