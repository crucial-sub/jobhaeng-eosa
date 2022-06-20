import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction, RootState } from 'store';
import { getAddress } from 'utils/getAddress';
import Map from './Map';
import Location from './Map';

type Props = {
    request: ItemTypes;
};

const RequestLocation = (props: Props) => {
    console.log(props.request);
    const dispatch = useDispatch();
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
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setGeoLocation((prev) => ({
                        ...prev,
                        lat: lat, // 위도
                        lng: lng, // 경도
                        isLoading: false,
                    }));
                    const { documents } = await getAddress(lat, lng);
                    const location = documents[0].road_address
                        ? documents[0].road_address.address_name
                        : documents[0].address.address_name;
                    dispatch(
                        requestAction.request({
                            ...props.request,
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
    }, []);
    return (
        <>
            <Label>잡행어사 출두 위치</Label>
            <Input readOnly value={props.request.location}></Input>
            <Map
                lat={geoLocation.lat}
                lng={geoLocation.lng}
                request={props.request}
            />
        </>
    );
};

const Label = styled.label``;

const Input = styled.input``;

export default RequestLocation;
