import Field from './Field'
import { useField } from 'Hooks'
import Control from './Control'
import RSelect from "react-select"

const Select = ({
    options,
    multi,
    display,
    choose,
    ...rest
}) => {

    const field = useField({
        type: Select.name,
        ...rest
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

    const formattedOptions = options.map(i => {
        return {
            value: choose(i),
            label: display(i)
        }
    })

    window.formattedOptions = formattedOptions;
    window.chosenValue = chosenValue;
    const chosenValueObject = formattedOptions.filter(i => {
        if (multi) {
            return chosenValue?.includes(i.value)
        }
        else {

            return i.value === chosenValue
        }
    })

    return (
        <Field
            {...rest}
            {...field}
        >
            <Control
                className="py-0 px-0 border-none items-center">
                <RSelect
                    isMulti={multi ? true : false}
                    options={formattedOptions}
                    className="w-full h-full block rounded-[8px]"
                    onClick={() => alert('hi')}
                    onChange={(e) => {
                        console.log(e)
                        if (!isDirty) {
                            setIsDirty(true)
                        }
                        if (multi) {
                            var chosenValues = e.map(i => i.value)
                            var displayValues = e.map(i => i.label)
                            setChosenValue(chosenValues)
                            setDisplayValue(displayValues)
                        } else {
                            setChosenValue(e.value)
                            setDisplayValue(e.label)
                        }
                    }}
                    value={chosenValueObject}
                />
            </Control>
        </Field>
    )
}

export default Select
