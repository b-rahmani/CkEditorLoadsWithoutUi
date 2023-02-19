import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'
import { useField } from 'Hooks'
import Field from './Field'
import Control from './Control'
const Color = ({ startIcon, ...rest }) => {
    const field = useField({
        type: Color.name,
        ...rest
    })
    const {
        displayValue,
        setDisplayValue,
        setChosenValue,
        label,
        progress,
        isValid,
    } = field

    return (
        <Field
            {...rest}
            {...field}
        >
            <Control>
                <input
                    type="color"
                    value={displayValue}
                    className="block w-full"
                    onChange={(e) => {
                        setDisplayValue(e.target.value)
                        setChosenValue(e.target.value)
                    }}
                />
            </Control>
        </Field>
    )
}
export default Color;
