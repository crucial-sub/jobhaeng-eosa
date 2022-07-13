import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { userDataTypes } from 'store';
import colors from 'styles/colors';
import { addressTypes } from './EditUserForm';

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
        <AddressContainer>
            <Title>주소</Title>
            <div>
                <span>주소 등록</span>
                <Find
                    type="button"
                    onClick={sample3_execDaumPostcode}
                    value="주소 찾기"
                >
                    주소찾기
                </Find>
            </div>
            <RefAddress>
                <div>
                    <label htmlFor="sample3_address"> 주소 </label>
                    <ShowFind
                        type="text"
                        id="sample3_address"
                        placeholder="주소"
                        required
                        value={addressInfo.address}
                    />
                </div>
                <div>
                    <label htmlFor="sample3_detailAddress"> 상세주소 </label>
                    <DetailAddress
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
                    <ExtraAddress
                        type="text"
                        id="sample3_extraAddress"
                        name="extra"
                        placeholder="참고항목"
                        value={addressInfo.extra}
                        onChange={handleChange}
                    />
                </div>
            </RefAddress>
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
        </AddressContainer>
    );
};

const AddressContainer = styled.div`
    margin: auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /* justify-content: space-between; */
    & div {
        width: 100%;
        display: flex;
        margin-top: 10px;
        & span {
            width: 20%;
            line-height: 30px;
        }
    }
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2rem;
    margin: auto;
`;

const Find = styled.button`
    width: 80%;
    height: 30px;
    background-color: ${colors.lightDark};
    color: ${colors.white};
    font-weight: 700;
    border-radius: 10px;
`;

const RefAddress = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & div {
        height: 30px;
        justify-content: space-between;
        & label {
            line-height: 30px;
        }
    }
`;

const ShowFind = styled.input`
    width: 80%;
`;

const DetailAddress = styled.input`
    width: 80%;
`;

const ExtraAddress = styled.input`
    width: 80%;
`;

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
