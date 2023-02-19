// total mess: https://en.wikipedia.org/wiki/List_of_calendars
import { format } from 'date-fns-jalali'
import { app } from 'Panel'

const DatePart = ({ value }) => {
    const normalizedValue = (value && value.endsWith('Z')) ? value : (value + 'Z');
    if (!value) {
        return null
    }
    const localeKey = app.getLocale().key;
    if (localeKey === 'fa') {
       return format(new Date(normalizedValue), 'yyyy/MM/dd')
    }
    if (localeKey === 'ar') {
        return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
            day: 'numeric', 
            month: 'numeric',
            year : 'numeric'
        }).format(Date.now());
    }
    return new Date(normalizedValue).toDateString()
}

export default DatePart 
