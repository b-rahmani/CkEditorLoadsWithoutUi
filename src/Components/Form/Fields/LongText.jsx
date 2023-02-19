import app from 'App'
import Field from './Field'
import Icon from '../../Icon'
import Control from './Control';
import { useField } from 'Hooks'
import { valueStyle } from './FieldStyle';

const LongText = ({
    regex,
    regexError,
    validate,
    startIcon,
    rows,
    ...rest
}) => {   
    const textAreaValidate = ({ displayValue }) => {
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
        type: LongText.name,
        validate: textAreaValidate,
        ...rest
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
        {...rest}
        {...field}
    >
        <Control>
            <textarea
                placeholder={app.t(placeholder)}
                className={"outline-none w-full resize-none" + valueStyle}
                value={displayValue}
                multiline="true"
                rows={+rows || 2}
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
    </Field >
};

export default LongText
