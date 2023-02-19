import {
    useContext,
    useEffect,
    useState,
} from 'react'
import { FormContext } from 'Contexts'
import app from 'App'

const useField = ({
    column,
    hint,
    label,
    placeholder,
    required,
    type,
    validate,
    value,
    valueExtractor,
}) => {
    const [id, setId] = useState()
    const [displayValue, setDisplayValue] = useState(value || (type === 'Check' ? false : ""))
    const [chosenValue, setChosenValue] = useState(value || (type === 'Check' ? false : ""))
    const [chosenEntity, setChosenEntity] = useState(null)
    const [helpText, setHelpText] = useState(hint)
    const initialHint = hint
    const {
        addFieldToFormContext,
        currentEntity,
        isDirty: isFormDirty,
        progress,
        setField,
        setIsDirty: setIsFormDirty,
    } = useContext(FormContext)
    const [validationState, setValidationState] = useState(null)
    const [camelizedColumn, setCamelizedColumn] = useState(column)
    const [isDirty, setIsDirty] = useState(false)
    const [calculatedLabel, setCalculatedLabel] = useState('')
    const [calculatedPlaceholder, setCalculatedPlaceholder] = useState('')

    useEffect(() => {
        setId(`${type}_${column}`)
        if (isNaN(column)) {
            setCamelizedColumn(app.camelize(column))
        } else {
            setCamelizedColumn(column)
        }
    }, [type, column])

    useEffect(() => {
        addFieldToFormContext({
            id,
            type,
            isValid: false,
            isDirty: false,
        })
    }, [id])

    const validateAll = () => {
        if (required && app.isNothing(displayValue) && app.isNothing(chosenValue)) {
            setValidationState('invalid required ' + Date.now())
            setHelpText(typeof required === "boolean" ? `${column} is not provided` : required)
        }
        else {
            if (validate && typeof validate === 'function') {
                var result = validate({ displayValue, chosenValue, chosenEntity })
                if (!result || result === true) {
                    setValidationState('valid ' + Date.now())
                    setHelpText(initialHint)
                }
                else {
                    setValidationState(`invalid ${result?.error} ${Date.now()}`)
                    setHelpText(result?.message)
                }
            }
            else {
                setValidationState('valid ' + Date.now())
                setHelpText(initialHint)
            }
        }
    }
    useEffect(() => {
        validateAll()
    }, [displayValue, isDirty])

    useEffect(() => {
        window.currentEntity = currentEntity
        if (currentEntity) {
            if (valueExtractor) {
                setDisplayValue(valueExtractor(currentEntity))
                setChosenValue(valueExtractor(currentEntity))
            }
            else {
                setDisplayValue(currentEntity[camelizedColumn])
                setChosenValue(currentEntity[camelizedColumn])
            }
        }
    }, [camelizedColumn, currentEntity])

    const isValid = () => {
        if (!validationState) {
            return false
        }
        if (validationState.indexOf('invalid') > -1) {
            return false
        }
        return true
    }

    useEffect(() => {
        setField({
            id,
            value: chosenValue || null,
            isValid: isValid() ? true : false,
            isDirty
        })
    }, [validationState, isDirty])

    useEffect(() => {
        if (isDirty) {
            setIsFormDirty(true)
        }
    }, [isDirty])

    useEffect(() => {
        setCalculatedPlaceholder((placeholder || label) || column)
    }, [placeholder, label, column])

    useEffect(() => {
        setCalculatedLabel(label || column)
    }, [label, column])

    return {
        chosenValue,
        displayValue: displayValue || '',
        helpText,
        id,
        isDirty,
        isValid,
        label: calculatedLabel,
        required,
        placeholder: calculatedPlaceholder,
        progress,
        setChosenEntity,
        setChosenValue,
        setDisplayValue,
        setField,
        setIsDirty,
        validateAll,
    }
}

export default useField
