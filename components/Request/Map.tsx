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
    useEffect(() => {
        const mapScript = document.createElement('script');

        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=287ffecf2171baeaf8539863aa7ad6c1&autoload=false`;

        document.head.appendChild(mapScript);

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map');
                const options = {
                    center: new window.kakao.maps.LatLng(lat, lng),
                };
                const map = new window.kakao.maps.Map(container, options);
                const markerPosition = new window.kakao.maps.LatLng(lat, lng);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                });
                marker.setMap(map);
            });
        };
        mapScript.addEventListener('load', onLoadKakaoMap);

        return () => mapScript.removeEventListener('load', onLoadKakaoMap);
    }, [lat, lng]);

    return <MapContainer id="map" />;
};

const MapContainer = styled.div`
    width: 390px;
    height: 300px;
`;

export default Map;
