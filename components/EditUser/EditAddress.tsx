import React, { Dispatch, SetStateAction, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { userDataTypes } from 'store';
import { addressTypes } from './EditUserForm';
import * as S from './styles';

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
        <S.AddressContainer>
            <S.AddressTitle>주소</S.AddressTitle>
            <div>
                <span>주소 등록</span>
                <S.Find
                    type="button"
                    onClick={sample3_execDaumPostcode}
                    value="주소 찾기"
                >
                    주소찾기
                </S.Find>
            </div>
            <S.RefAddress>
                <div>
                    <label htmlFor="sample3_address"> 주소 </label>
                    <S.ShowFind
                        type="text"
                        id="sample3_address"
                        placeholder="주소"
                        required
                        value={addressInfo.address}
                    />
                </div>
                <div>
                    <label htmlFor="sample3_detailAddress"> 상세주소 </label>
                    <S.DetailAddress
                        type="text"
                        id="sample3_detailAddress"
                        name="detail"
                        placeholder="상세주소"
                        required
                        value={addressInfo.detail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="sample3_extraAddress"> 참고항목 </label>
                    <S.ExtraAddress
                        type="text"
                        id="sample3_extraAddress"
                        name="extra"
                        placeholder="참고항목"
                        value={addressInfo.extra}
                        onChange={handleChange}
                    />
                </div>
            </S.RefAddress>
            {visible ? (
                <S.Wrap id="wrap">
                    <S.CloseImg
                        src="//t1.daumcdn.net/postcode/resource/images/close.png"
                        id="btnFoldWrap"
                        onClick={foldDaumPostcode}
                        alt="접기 버튼"
                    />
                    <DaumPostcode
                        onComplete={handleComplete}
                        style={S.postCodeStyle}
                    />
                </S.Wrap>
            ) : null}
        </S.AddressContainer>
    );
};

export default EditAddress;
