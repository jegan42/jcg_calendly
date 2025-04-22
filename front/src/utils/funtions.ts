export const getDefaultTimes = (date: string) => {
    if (!date) {
        return { defaultStart: "", defaultEnd: "" };
    }
    const inputTime = new Date(date).toISOString().slice(11, 13);
    let addNine = 0;
    if (inputTime === "00") addNine = 9;
    const base = new Date(date);
    const defaultStart = new Date(base.getTime() + addNine * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16);
    const defaultEnd = new Date(base.getTime() + (addNine + 1) * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16);
    return { defaultStart, defaultEnd };
};
