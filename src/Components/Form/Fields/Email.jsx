import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'
import Icon from '../../Icon'
import Control from './Control';
import { valueStyle } from './FieldStyle';

const Email = ({
    regex,
    regexError,
    validate,
    startIcon,
    placeholder,
    title,
    ...rest
}) => {

    const textValidate = ({ displayValue }) => {
        if (regex && regex.test && app.isSomething(displayValue)) {
            if (displayValue.match(regex)) {
                return true;
            }
            else {
                return {
                    error: 'regex',
                    message: regexError
                }
            }
        }
        if (validate && typeof validate === 'function') {
            return validate(displayValue)
        }
    }

    const field = useField({
        type: Email.name,
        validate: textValidate,
        ...rest
    })
    const {
        displayValue,
        setDisplayValue,
        setChosenValue,
        label,
        progress,
        isValid,
        setIsDirty,
        isDirty,
    } = field

    return <Field
        {...rest}
        {...field}
    >
        <Control>
            <input
                type="email"
                className={"outline-none w-full " + valueStyle}
                value={displayValue}
                placeholder={placeholder || title}
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
};

export default Email
