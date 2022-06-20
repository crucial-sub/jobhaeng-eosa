import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
// import { Map, MapMarker } from 'react-kakao-maps-sdk';

type Props = {
    lat: number;
    lng: number;
};

declare global {
    interface Window {
        kakao: any;
    }
}

const Map = (props: Props) => {
    const { lat, lng } = props;
    const [centerPosition, setCenterPosition] = useState({
        lat: lat,
        lng: lng,
    });
    const [clickPosition, setClickPosition] = useState({
        lat: lat,
        lng: lng,
    });
    const [mapLevel, setMapLevel] = useState(3);
    useEffect(() => {
        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById('map');
                const mapOption = {
                    center: new window.kakao.maps.LatLng(
                        centerPosition.lat,
                        centerPosition.lng,
                    ),
                    level: mapLevel,
                };

                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(
                        clickPosition.lat,
                        clickPosition.lng,
                    ),
                });
                marker.setMap(map);

                window.kakao.maps.event.addListener(
                    map,
                    'click',
                    (mouseEvent: any) => {
                        const level = map.getLevel();
                        setMapLevel(() => level);

                        const mapCenter = map.getCenter();
                        setCenterPosition({
                            ...centerPosition,
                            lat: mapCenter.getLat(),
                            lng: mapCenter.getLng(),
                        });

                        const clickLatLng = mouseEvent.latLng;
                        setClickPosition({
                            ...clickPosition,
                            lat: clickLatLng.getLat(),
                            lng: clickLatLng.getLng(),
                        });
                        marker.setPosition(clickLatLng);
                    },
                );
            });
        };
        return onLoadKakaoMap();
    }, [centerPosition, clickPosition]);

    return <MapContainer id="map" />;
};

const MapContainer = styled.div`
    width: 390px;
    height: 300px;
`;

export default Map;
