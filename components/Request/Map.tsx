import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ItemTypes, requestAction } from 'store';
import { coordToAddress } from 'utils/fetcher';
import * as S from './styles';

type Props = {
    lat: number;
    lng: number;
    request?: ItemTypes;
    items?: ItemTypes;
    mapUseFor: string;
    setItems?: Dispatch<SetStateAction<ItemTypes | undefined>>;
};

declare global {
    interface Window {
        kakao: any;
    }
}

const Map = (props: Props) => {
    const { lat, lng, request, mapUseFor, setItems, items } = props;
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
                        const { documents } = await coordToAddress(
                            latlng.getLat(),
                            latlng.getLng(),
                        );
                        const location = documents[0].road_address
                            ? documents[0].road_address.address_name
                            : documents[0].address.address_name;
                        const town = documents[0].address.region_3depth_name;
                        if (mapUseFor === 'request') {
                            dispatch(
                                requestAction.request({
                                    ...request,
                                    location: location,
                                    town: town,
                                }),
                            );
                        } else if (mapUseFor === 'edit' && setItems) {
                            setItems({
                                ...items,
                                location: location,
                                town: town,
                            });
                        }
                    },
                );
            });
        };
        return onLoadKakaoMap();
    }, [position]);

    return <S.MapContainer id="map" />;
};

export default Map;
