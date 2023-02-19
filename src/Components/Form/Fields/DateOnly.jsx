import app from 'App'
import Field from './Field'
import Control from './Control'
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useField } from 'Hooks'

const DateOnly = ({ ...rest }) => {
    const field = useField({
        type: DateOnly.name,
        ...rest
    })
    const {
        displayValue,
        setDisplayValue,
        setChosenValue,
        chosenValue,
        label,
        progress,
        isValid,
    } = field
    // console.log("selected  date", chosenValue?.toDate?.().toString());
    // .toLocaleDateString('en-US')
    return (
        <Field
            {...rest}
            {...field}
        >
            <Control>
                <DatePicker
                    inputClass="w-full h-full border-none outline-none"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-center"
                    onChange={setChosenValue}
                    value={chosenValue}
                />
            </Control>
        </Field>
    )
}

export default DateOnly
