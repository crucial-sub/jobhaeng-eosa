import styled from '@emotion/styled';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction, RootState, userDataTypes } from 'store';
import { coordToAddress } from 'utils/fetcher';
import Map from './Map';
import Location from './Map';

type Props = {
    request: ItemTypes;
    currentUser: userDataTypes;
};

const RequestLocation = (props: Props) => {
    const { request, currentUser } = props;
    const dispatch = useDispatch();
    const [geoLocation, setGeoLocation] = useState({
        lat: 37.5912237,
        lng: 127.0497798,
        errMsg: '',
        isLoading: true,
    });
    const [visible, setVisible] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const id = e.currentTarget.id;
        if (id === 'address') {
            dispatch(
                requestAction.request({
                    ...request,
                    location: currentUser.address,
                }),
            );
            setVisible(false);
        } else if (id === 'location') {
            setVisible(true);
            dispatch(
                requestAction.request({
                    ...request,
                    location: '',
                }),
            );
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
            requestAction.request({
                ...request,
                extraLocation: e.target.value,
            }),
        );
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
                    dispatch(
                        requestAction.request({
                            ...request,
                            location: location,
                        }),
                    );
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
                <div onClick={handleClick} id="address">
                    내 주소
                </div>
                <div onClick={handleClick} id="location">
                    현재 위치
                </div>
            </div>
            <Input type="text" required value={request.location}></Input>
            {visible && (
                <Map
                    lat={geoLocation.lat}
                    lng={geoLocation.lng}
                    request={request}
                    mapUseFor="request"
                />
            )}
            <label>출두 위치 부가 설명 (선택)</label>
            <textarea
                onChange={handleChange}
                value={request.extraLocation}
            ></textarea>
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default RequestLocation;
