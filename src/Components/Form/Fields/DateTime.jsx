import app from 'App'
import Field from './Field'
import { useField } from 'Hooks'
import Control from './Control'
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const DateTime = ({ ...rest }) => {
    const field = useField({
        type: DateTime.name,
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

    // console.log("dateTime format", chosenValue?.toDate?.().toString());
    // .toLocaleString('en-US')
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
                    format="YYYY/DD/MM HH:mm:ss"
                    plugins={[
                        <TimePicker position="bottom" />
                    ]}
                    calendarPosition="bottom-center"
                    onChange={setChosenValue}
                    value={chosenValue}
                />
            </Control>
        </Field>
    )
}

export default DateTime
