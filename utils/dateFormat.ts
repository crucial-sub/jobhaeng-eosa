export const getTimeDate = (time: Date) => {
    if (time) {
        const date = time.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        });
        return date;
    } else return;
};

export const getMonthDayTime = (time: Date) => {
    if (time) {
        const date = time.toLocaleDateString();
        const hourMin = time.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        return `${date} ${hourMin}`;
    } else return;
};

export const getMonthDay = (time: Date) => {
    if (time) {
        const date = time.toLocaleDateString();
        return date;
    } else return;
};

var myObj = {
    style: 'currency',
    currency: 'KR',
};

export function numberCommas(reward: string | undefined) {
    if (reward) {
        const money = Number(reward)
            .toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })
            .toString();
        return money;
    }
}
