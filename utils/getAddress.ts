import axios from 'axios';

export const getAddress = async (lat: number, lng: number) => {
    try {
        const { data } = await axios.get(
            `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
            {
                headers: {
                    Authorization: `KakaoAK ab4ba3910489cb98625922638eaf954e`,
                },
            },
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};
