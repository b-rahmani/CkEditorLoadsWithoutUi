import {
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'
import app from 'App'
import { get } from 'App'
import {
    BrowseContext,
    DialogContext,
    FormContext,
} from 'Contexts'
import {
    useField,
    useMessage,
} from 'Hooks'
import BrowserDialog from '../../Browse/BrowserDialog'
import BrowserIcons from '../../Browse/BrowserIcons'
import Field from './Field'
import Control from './Control';
import { valueStyle } from './FieldStyle';

const Browse = ({
    choose,
    list,
    show,
    entityType,
    placeholder,
    title,
    ...rest
}) => {

    const [open, setOpen] = useState(false)
    const [selectedEntity, setSelectedEntity] = useState(null)
    const [loading, setLoading] = useState(false)

    const { error } = useMessage()

    const {
        formMode,
        mode,
    } = useContext(FormContext)

    const field = useField({
        choose,
        entityType,
        list,
        show,
        type: Browse.name,
        ...rest
    })

    const {
        chosenValue,
        displayValue,
        isDirty,
        label,
        progress,
        setChosenValue,
        setDisplayValue,
        setIsDirty,
    } = field

    useEffect(() => {
        if (selectedEntity) {
            return
        }
        if (!displayValue && !chosenValue) {
            return
        }
        if (mode == formMode.edition) {
            setLoading(true)
            get(`/${entityType}/get/${displayValue}`)
                .then(entity => {
                    setLoading(false)
                    setSelectedEntity(entity)
                    setChosenValue(choose(entity))
                    setDisplayValue(show(entity))
                }, e => {
                    setLoading(false)
                    error(e)
                })
        }
    }, [displayValue, chosenValue, selectedEntity])

    return <Field
        {...field}
        {...rest}
    >
        {
            mode == formMode.creation
                ?
                <DialogContext.Provider
                    value={{
                        open,
                        setOpen
                    }}
                >
                    <BrowseContext.Provider
                        value={{
                            close: () => setOpen(false),
                            entityType,
                            list,
                            onSelected: (entity) => {
                                if (entity) {
                                    setChosenValue(choose(entity))
                                    setDisplayValue(show(entity))
                                }
                            },
                            progress,
                            selectedEntity,
                            setSelectedEntity,
                            small: true,
                            ...rest
                        }}
                    >
                        <BrowserDialog />
                        <Control className="items-center">
                            <input
                                type="text"
                                className={"outline-none w-full " + valueStyle}
                                value={displayValue}
                                readOnly
                                placeholder={placeholder || title}
                                onBlur={() => {
                                    if (!isDirty) {
                                        setIsDirty(true)
                                    }
                                }}
                            // onFocus={(e) => {
                            //     if (!isDirty) {
                            //         setIsDirty(true);
                            //     }
                            //     setDisplayValue(e.target.value)
                            //     setChosenValue(e.target.value)
                            // }}
                            />
                            <BrowserIcons onCleared={() => {
                                setChosenValue('')
                                setDisplayValue('')
                                setSelectedEntity(null)
                            }} />
                        </Control>
                    </BrowseContext.Provider>
                </DialogContext.Provider>
                :
                <Control>
                    <input
                        type="text"
                        className={"outline-none w-full " + valueStyle}
                        value={displayValue}
                        readOnly
                        placeholder={placeholder || title}
                        disabled
                    />
                </Control>
        }

    </Field>
}

export default Browse
