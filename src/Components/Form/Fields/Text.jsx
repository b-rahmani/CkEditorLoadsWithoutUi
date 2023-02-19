import app from 'App'
import Field from './Field'
import Control from './Control'
import PaydarIcon from '../../Icon'
import { useField } from 'Hooks'
import { valueStyle } from './FieldStyle'

const Text = ({
    regex,
    regexError,
    validate,
    startIcon,
    helpText,
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
        type: Text.name,
        validate: textValidate,
        helpText: helpText,
        // label:placeholder,
        ...rest
    })
    const {
        displayValue,
        isDirty,
        setDisplayValue,
        setChosenValue,
        placeholder,
        progress,
        setIsDirty,
    } = field

    return <Field
        {...rest}
        {...field}
    >
        <Control className="items-center">
            {startIcon ? <div className='w-10 h-full '>
                <PaydarIcon
                    icon={startIcon}
                    className="absolute w-9 h-full bg-indigo-100 fill-slate-500 group-hover:fill-indigo-400 transition-all duration-300 px-2 rtl:right-0 ltr:left-0 top-[50%] translate-y-[-50%]  border-l border-slate-200 rounded-[8px]"
                />
            </div>
                : null}
            <input
                className={`outline-none w-full ${valueStyle}`}
                value={displayValue}
                placeholder={app.t(placeholder)}
                onBlur={() => {
                    if (!isDirty) {
                        setIsDirty(true)
                    }
                }}
                onChange={(e) => {
                    if (!isDirty) {
                        setIsDirty(true)
                    }
                    setDisplayValue(e.target.value)
                    setChosenValue(e.target.value)
                }}
            // {...rest}
            />
        </Control>
    </Field>
};

export default Text
