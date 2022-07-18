import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ItemTypes, userDataTypes } from 'store';
import { coordToAddress } from 'utils/fetcher';
import Map from '../Request/Map';
import * as S from './styles';

type Props = {
    items: ItemTypes;
    currentUser: userDataTypes;
    setItems: Dispatch<SetStateAction<ItemTypes | undefined>>;
};

const EditItemLocation = (props: Props) => {
    const { items, currentUser, setItems } = props;
    const [geoLocation, setGeoLocation] = useState({
        lat: 37.5912237,
        lng: 127.0497798,
        errMsg: '',
        isLoading: true,
    });
    const [visible, setVisible] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState<string>('');

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const { method } = e.currentTarget.dataset;
        if (method === 'address') {
            setVisible(false);
            setItems({
                ...items,
                location: currentUser.address,
            });
        } else if (method === 'location') {
            setVisible(true);
        }
        setSelectedMethod(method!);
    };
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setItems({
            ...items,
            extraLocation: e.target.value,
        });
    };

    useEffect(() => {
        if (!visible) return;
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옴
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setGeoLocation((prev) => ({
                        ...prev,
                        lat: lat, // 위도
                        lng: lng, // 경도
                        isLoading: false,
                    }));
                    const { documents } = await coordToAddress(lat, lng);
                    const location = documents[0].road_address
                        ? documents[0].road_address.address_name
                        : documents[0].address.address_name;
                    setItems({
                        ...items,
                        location: location,
                    });
                },
                (err) => {
                    setGeoLocation((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }));
                },
            );
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
            setGeoLocation((prev) => ({
                ...prev,
                errMsg: 'geolocation을 사용할수 없어요..',
                isLoading: false,
            }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);
    return (
        <S.LocationBox>
            <S.LocationSelectTab>
                <S.Tab
                    onClick={handleClick}
                    className={`${
                        selectedMethod === 'address' ? 'selected' : ''
                    }`}
                    data-method="address"
                >
                    내 주소 입력
                </S.Tab>
                <S.Tab
                    onClick={handleClick}
                    className={`${
                        selectedMethod === 'location' ? 'selected' : ''
                    }`}
                    data-method="location"
                >
                    지도로 선택
                </S.Tab>
            </S.LocationSelectTab>
            <S.Input
                type="text"
                required
                value={items.location}
                placeholder="잡행어사 출두 위치"
            ></S.Input>
            {visible && (
                <Map
                    lat={geoLocation.lat}
                    lng={geoLocation.lng}
                    items={items}
                    setItems={setItems}
                    mapUseFor="edit"
                />
            )}
            <S.TextArea
                onChange={handleChange}
                value={items.extraLocation}
                placeholder={`출두 위치에 대한 부가정보를 입력해주세요. 잡행어사가 보다 쉽게 찾아갈 수 있어요.\nex) XX사거리 ○○건물 2층 화장실 3번째 칸`}
            ></S.TextArea>
        </S.LocationBox>
    );
};

export default EditItemLocation;
