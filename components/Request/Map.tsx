import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import { getAddress } from 'utils/getAddress';

type Props = {
    lat: number;
    lng: number;
    request: ItemTypes;
};

declare global {
    interface Window {
        kakao: any;
    }
}

const Map = (props: Props) => {
    const { lat, lng, request } = props;
    const dispatch = useDispatch();
    const [position, setPosition] = useState({
        lat: lat,
        lng: lng,
    });

    useEffect(() => {
        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const centerPosition = new window.kakao.maps.LatLng(
                    position.lat,
                    position.lng,
                );
                const options = {
                    center: centerPosition,
                    level: 3,
                };
                const map = new window.kakao.maps.Map(container, options);
                const marker = new window.kakao.maps.Marker({
                    position: centerPosition,
                });
                marker.setMap(map);
                window.kakao.maps.event.addListener(
                    map,
                    'center_changed',
                    () => {
                        const latlng = map.getCenter();
                        map.setCenter(latlng);
                        marker.setPosition(latlng);
                    },
                );
                window.kakao.maps.event.addListener(
                    map,
                    'dragend',
                    async () => {
                        const latlng = map.getCenter();
                        const { documents } = await getAddress(
                            latlng.getLat(),
                            latlng.getLng(),
                        );
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
                );
            });
        };
        return onLoadKakaoMap();
    }, [position]);

    return <MapContainer id="map" />;
};

const MapContainer = styled.div`
    max-width: 390px;
    height: 300px;
`;

export default Map;
