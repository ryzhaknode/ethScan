export function convertDateToYearMonthDay(Date: Date) {
    return Date.toISOString().split('T')[0];
}

export function formattedDateFunc(Date: Date) {
    const day = Date.getDate().toString().padStart(2, '0');
    const month = (Date.getMonth() + 1).toString().padStart(2, '0');
    const year = Date.getFullYear();
    return `${day}.${month}.${year}`
}

export function convertDate(dateString: string | undefined) {
    if (dateString === "") return ""

    if (dateString !== undefined) {
        const parts = dateString.split('.');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    return ""
}

export function replaceForDot(str: string | undefined) {
    return str?.replaceAll('/', '.')
}