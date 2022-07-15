import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ItemTypes, requestAction, RootState, userDataTypes } from 'store';
import { coordToAddress } from 'utils/fetcher';
import Map from '../Request/Map';

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

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const method = e.currentTarget.dataset.method;
        if (method === 'address') {
            setVisible(false);
            setItems({
                ...items,
                location: currentUser.address,
            });
        } else if (method === 'location') {
            setVisible(true);
        }
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
    }, [visible]);
    return (
        <>
            <Label>잡행어사 출두 위치</Label>
            <div>
                <div onClick={handleClick} data-method="address">
                    내 주소
                </div>
                <div onClick={handleClick} data-method="location">
                    현재 위치
                </div>
            </div>
            <Input type="text" required value={items.location}></Input>
            {visible && (
                <Map
                    lat={geoLocation.lat}
                    lng={geoLocation.lng}
                    items={items}
                    setItems={setItems}
                    mapUseFor={'edit'}
                />
            )}
            <label>출두 위치 부가 설명 (선택)</label>
            <textarea
                onChange={handleChange}
                value={items.extraLocation}
            ></textarea>
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default EditItemLocation;
