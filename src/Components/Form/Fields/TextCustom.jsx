import app from 'App'
import Field from './Field';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import Control from './Control'
import { valueStyle } from './FieldStyle'
import { useField } from 'Hooks'

const TextCustom = ({
  regex,
  regexError,
  validate,
  startIcon,
  placeholder,
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
    type: TextCustom.name,
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
  return (
    <Field
      {...rest}
      {...field}
    >
      <Control>
        <input
          type="text"
          className={"w-full outline-none border-none placeholder-slate-300" + valueStyle}
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
        {!isValid() && isDirty && <ErrorOutlinedIcon className="text-red-600 -ml-2" />}
      </Control>
    </Field>
  )
}

export default TextCustom
