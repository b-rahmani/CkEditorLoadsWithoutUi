import app from 'App'
import Field from './Field'
import Icon from '../../Icon'
import Control from './Control'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { valueStyle } from './FieldStyle'
import { useField } from 'Hooks'
import { useState } from 'react'

const Password = ({
  regex,
  regexError,
  validate,
  startIcon,
  ...rest
}) => {

  const [isShow, setIsShow] = useState(false);

  const emailValidate = ({ displayValue }) => {
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
    type: Password.name,
    validate: emailValidate,
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
      <div
        onClick={() => setIsShow(prev => !prev)}
        className="[padding-inline-end:5px]"
      >
        {isShow ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </div>
      <input
        type={isShow ? "text" : "password"}
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
          setDisplayValue(e.target.value)
          setChosenValue(e.target.value)
        }}
      />

    </Control>
  </Field>
};

export default Password
