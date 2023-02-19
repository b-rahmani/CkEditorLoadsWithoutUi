import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import app from 'App'
import { useField } from 'Hooks'
import Field from './Field'
import Icon from '../../Icon'
import { valueStyle } from './FieldStyle'
import Control from './Control'

const Phone = ({
  regex,
  regexError,
  validate,
  startIcon,
  ...rest
}) => {

  const phoneValidate = ({ displayValue }) => {
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
    type: Phone.name,
    validate: phoneValidate,
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
    placeholder
  } = field

  return <Field
    {...rest}
    {...field}
  >
    <Control>

      <input
        placeholder={placeholder}
        type="tel"
        inputMode="numeric"
        className={"outline-none w-full " + valueStyle}
        value={displayValue}
        onBlur={() => {
            if (!isDirty) {
                setIsDirty(true)
            }
        }}
        onChange={(e) => {
          if (!isDirty) {
            setIsDirty(true);
          }
          const result = e.target.value.replace(/\D/g, '');
          setDisplayValue(result)
          setChosenValue(result)
        }}
      />
    </Control>
  </Field>
};

export default Phone
