import moment from 'moment';

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

    static formatDate1 = (dateString: string): string => {
        const inputDate = moment(dateString);
        const today = moment();

        if (inputDate.isSame(today, 'day')) {
            return inputDate.format('h:mm A');
        }

        if (inputDate.isSame(today, 'month') && inputDate.isSame(today, 'year')) {
            return inputDate.format('D MMM [at] h:mm A');
        }

        if (inputDate.isSame(today, 'year')) {
            return inputDate.format('D MMMM [at] h:mm A');
        }

        return inputDate.format('D MMMM YYYY [at] h:mm A');
    };
}
