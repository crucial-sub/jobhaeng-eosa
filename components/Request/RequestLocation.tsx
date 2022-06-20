import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import Map from './Map';
import Location from './Map';

type Props = {
    request: ItemTypes;
};

const RequestLocation = (props: Props) => {
    const dispatch = useDispatch();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            requestAction.request({
                ...props.request,
                location: e.target.value,
            }),
        );
    };
    const [geoLocation, setGeoLocation] = useState({
        lat: 37.5912237,
        lng: 127.0497798,
        errMsg: '',
        isLoading: true,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옴
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setGeoLocation((prev) => ({
                        ...prev,
                        lat: position.coords.latitude, // 위도
                        lng: position.coords.longitude, // 경도
                        isLoading: false,
                    }));
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
    }, []);
    return (
        <>
            <Label>잡행어사 출두 위치</Label>
            <Input onChange={handleChange}></Input>
            <Map lat={geoLocation.lat} lng={geoLocation.lng} />
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default RequestLocation;
