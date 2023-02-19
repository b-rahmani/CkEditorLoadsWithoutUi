import Field from './Field'
import Control from './Control'
import { useField } from 'Hooks'
import { valueStyle } from './FieldStyle';

const Radio = ({
    activeClassName,
    choose,
    controlClassName,
    display,
    hideLabel,
    options,
    styleProvider,
    value,
    ...rest
}) => {

    const field = useField({
        type: Radio.name,
        value,
        ...rest
    })

    const {
        chosenValue,
        displayValue,
        id,
        isDirty,
        isValid,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field

    return <Field
        type='text'
        hideLabel={hideLabel}
        {...rest}
        {...field}
    >
        <Control className={controlClassName ?? "flex flex-col items-start"}>
            {
                options.map(i => <div
                    key={i?.value}
                    className={`${styleProvider && styleProvider(i.value)} flex gap-3 flex-row-reverse ${(displayValue == i?.id || i?.key) && activeClassName}`}
                >
                    <label
                        className="text-[#112a53] dark:text-white"
                        htmlFor={`${id}Option${choose(i)}`}
                    >
                        {display(i)}
                    </label>
                    <input
                        id={`${id}Option${choose(i)}`}
                        name={id}
                        type="radio"
                        {...rest}
                        className={"outline-none w-full" + valueStyle}
                        value={choose(i)}
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
                        defaultChecked={value === choose(i)}
                    />
                </div>)
            }
        </Control>
    </Field>
}

export default Radio
