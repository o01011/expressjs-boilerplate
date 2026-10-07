export const stringUtils = {
    isEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    isPhoneNumber(phone) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    },
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    slugify(str) {
        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_]+/g, "-")
            .replace(/^-+|-+$/g, "");
    },
    truncate(str, length, suffix = "...") {
        if (str.length <= length)
            return str;
        return str.slice(0, length - suffix.length) + suffix;
    },
    removeSpecialCharacters(str) {
        return str.replace(/[^\w\s]/g, "");
    },
    toCamelCase(str) {
        return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    },
    toSnakeCase(str) {
        return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    },
};
//# sourceMappingURL=string.utils.js.map