const krWObj = {
    style: 'currency',
    currency: 'KRW',
};

export function numberCommas(reward: string | undefined) {
    if (reward) {
        const money = Number(reward).toLocaleString('ko-KR', krWObj).toString();
        return money;
    }
}

export const numberWithCommas = (reward: string) => {
    const first = reward.replace(/,/g, '').replace(/[^0-9]/g, '');
    const final = Number(first).toLocaleString('ko-KR').toString();
    return final;
};
