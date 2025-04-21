export const getDefaultTimes = (date: string) => {
    if (!date) {
        return { defaultStart: "", defaultEnd: "" };
    }
    const base = new Date(date);
    const defaultStart = new Date(base.getTime() + 9 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16);
    const defaultEnd = new Date(base.getTime() + 10 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16);
    return { defaultStart, defaultEnd };
};
