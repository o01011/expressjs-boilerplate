export const dateUtils = {
    now() {
        return new Date();
    },
    addMilliseconds(date, ms) {
        return new Date(date.getTime() + ms);
    },
    addSeconds(date, seconds) {
        return this.addMilliseconds(date, seconds * 1000);
    },
    addMinutes(date, minutes) {
        return this.addSeconds(date, minutes * 60);
    },
    addHours(date, hours) {
        return this.addMinutes(date, hours * 60);
    },
    addDays(date, days) {
        return this.addHours(date, days * 24);
    },
    isAfter(date, compareDate) {
        return date.getTime() > compareDate.getTime();
    },
    isBefore(date, compareDate) {
        return date.getTime() < compareDate.getTime();
    },
    isSameDay(date1, date2) {
        return date1.toDateString() === date2.toDateString();
    },
    getDaysDifference(date1, date2) {
        const msPerDay = 24 * 60 * 60 * 1000;
        return Math.floor(Math.abs(date1.getTime() - date2.getTime()) / msPerDay);
    },
    formatISO(date) {
        return date.toISOString();
    },
    parseISO(dateString) {
        const date = new Date(dateString);
        return Number.isNaN(date.getTime()) ? null : date;
    },
};
//# sourceMappingURL=date.utils.js.map