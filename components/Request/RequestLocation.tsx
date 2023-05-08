import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction, userDataTypes } from 'store';
import { coordToAddress } from 'utils/fetcher';
import Map from './Map';
import * as S from './styles';

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
    const [selectedMethod, setSelectedMethod] = useState<string>('');

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const method = e.currentTarget.dataset.method;
        if (method === 'address') {
            dispatch(
                requestAction.request({
                    ...request,
                    location: currentUser.address,
                    town: currentUser.town,
                }),
            );
            setVisible(false);
        } else if (method === 'location') {
            setVisible(true);
            dispatch(
                requestAction.request({
                    ...request,
                    location: '',
                    town: '',
                }),
            );
        }
        setSelectedMethod(method!);
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
                    const town = documents[0].address.region_3depth_name;
                    dispatch(
                        requestAction.request({
                            ...request,
                            location: location,
                            town: town,
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
                value={request.location}
                placeholder="잡행어사 출두 위치"
            ></S.Input>
            {visible && (
                <Map
                    lat={geoLocation.lat}
                    lng={geoLocation.lng}
                    request={request}
                    mapUseFor="request"
                />
            )}
            <S.TextArea
                onChange={handleChange}
                value={request.extraLocation}
                placeholder={`출두 위치에 대한 부가정보를 입력해주세요. 잡행어사가 보다 쉽게 찾아갈 수 있어요.\nex) XX사거리 ○○건물 2층 화장실 3번째 칸`}
            ></S.TextArea>
        </S.LocationBox>
    );
};

export default RequestLocation;
