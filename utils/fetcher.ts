import axios from 'axios';

export const coordToAddress = async (lat: number, lng: number) => {
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

export const getDistrict = async () => {
    try {
        const { data } = await axios.get(
            `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=11*000000`,
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};
export const getTown = async (code: string) => {
    try {
        const { data } = await axios.get(
            `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=11${code}*&is_ignore_zero=true`,
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};
