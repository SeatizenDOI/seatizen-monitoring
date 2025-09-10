export const formatDateTime = (date: Date): string => {
    const YYYY = date.getUTCFullYear();
    const MM = String(date.getUTCMonth() + 1).padStart(2, "0"); // months are 0-based
    const DD = String(date.getUTCDate()).padStart(2, "0");
    const HH = String(date.getUTCHours()).padStart(2, "0");
    const mm = String(date.getUTCMinutes()).padStart(2, "0");
    const SS = String(date.getUTCSeconds()).padStart(2, "0");

    return `${YYYY}${MM}${DD}_${HH}${mm}${SS}`;
};
