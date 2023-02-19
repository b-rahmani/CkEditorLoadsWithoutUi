import app from 'App'
import Field from './Field'
import { useField } from 'Hooks'
import Control from './Control'
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const Time = ({ ...rest }) => {
    const field = useField({
        type: Time.name,
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

    // console.log("time", chosenValue?.toDate?.().toLocaleTimeString('en-US', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: false
    // }));

    return (
        <Field
            {...rest}
            {...field}
        >
            <Control>
                <DatePicker
                    inputClass="w-full h-full border-none outline-none"
                    disableDayPicker
                    format="HH:mm"
                    plugins={[
                        <TimePicker hideSeconds />
                    ]}
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

export default Time
