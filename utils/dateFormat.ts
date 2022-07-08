export const getTimeDate = (time: Date) => {
    const date = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    return date;
};

export const getMonthDayTime = (time: Date) => {
    const date = time.toLocaleDateString();
    const hourMin = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
    return `${date} ${hourMin}`;
};

export const getMonthDay = (time: Date) => {
    const date = time.toLocaleDateString();
    return date;
};
