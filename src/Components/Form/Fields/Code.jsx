import OutlinedInput from '@mui/material/OutlinedInput'
import app from 'App'
import Control from './Control';
import { useField } from 'Hooks'
import Field from './Field'
import { valueStyle } from './FieldStyle';

const Code = (props) => {

    const field = useField({
        type: 'Code',
        ...props
    })
    const {
        displayValue,
        setDisplayValue,
        setChosenValue,
        placeholder,
        label,
        progress,
        isValid,
        setIsDirty,
        isDirty,
    } = field

    return <Field
        {...props}
        {...field}
    >
        <Control>
            <textarea
                placeholder={placeholder}
                className={"outline-none w-full resize-none" + valueStyle}
                value={displayValue}
                multiline="true"
                rows={+props.rows || 4}
                onBlur={() => {
                    if (!isDirty) {
                        setIsDirty(true)
                    }
                }}
                onChange={(e) => {
                    if (!isDirty) {
                        setIsDirty(true);
                    }
                    setDisplayValue(e.target.value)
                    setChosenValue(e.target.value)
                }}
            />
        </Control>
    </Field>
}

export default Code

