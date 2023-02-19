import { useField } from 'Hooks'
import Field from './Field'
import Checkbox from '@mui/material/Checkbox';

const Check = (props) => {

    const field = useField({
        type: Check.name,
        ...props
    })

    const {
        chosenValue,
        displayValue,
        isDirty,
        isValid,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field

    return <Field
        {...props}
        {...field}
    >
        <Checkbox
            checked={chosenValue || false}
            onBlur={() => {
                if (!isDirty) {
                    setIsDirty(true)
                }
            }}
            onChange={(e) => {
                if (!isDirty) {
                    setIsDirty(true)
                }
                setDisplayValue(e.target.checked)
                setChosenValue(e.target.checked)
            }}
        />
    </Field>
};

export default Check
