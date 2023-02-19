import app from 'App'
import Field from './Field'
import { useField } from 'Hooks'
import Control from './Control'
import Select from "react-select"
const Lookup = ({ items, ...rest }) => {
  const field = useField({
    type: Lookup.name,
    ...rest
  })
  const {
    displayValue,
    setDisplayValue,
    setChosenValue,
    label,
    progress,
    isValid,
  } = field;

  return (
    <Field
      {...rest}
      {...field}
    >
      <Control
        className="py-0 px-0 border-none">
        <Select
          options={items}
          className="w-full h-full block rounded-[8px]"
        />
      </Control>
    </Field>
  )
}

export default Lookup
