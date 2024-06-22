export class Helper {
    static formatDate(dateString: string): string {
        const date = new Date(dateString);

        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const formattedDate = `Th${month} ${year}`;

        return formattedDate;
    }
    static formatDDMMYYYY(dateString: string): string {
        const date = new Date(dateString);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();

        const formattedDay = day.toString().padStart(2, '0');
        const formattedMonth = month.toString().padStart(2, '0');

        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

        return formattedDate;
    }
}
