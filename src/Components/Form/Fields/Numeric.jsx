import app from 'App'
import { useField } from 'Hooks'
import Control from './Control';
import Field from './Field'
import { valueStyle } from './FieldStyle';

const Numeric = ({ startIcon, ...rest }) => {

  const field = useField({
    type: Numeric.name,
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
        type='number'
        className={"outline-none w-full " + valueStyle}
        value={displayValue}
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
          setChosenValue(isNaN(e.target.value) ? 0 : e.target.value * 1)
        }}
      />
    </Control>
  </Field>
};

export default Numeric
