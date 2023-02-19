import Chip from './Chip'
import DialogForm from '../../Form/DialogForm'
import app from 'App'
import Radio from '../../Form/Fields/Radio'
import {
    useContext,
    useEffect,
    useState,
} from 'react'
import {
    DialogContext,
    EntityContext,
    ListContext,
} from 'Contexts'
import { post } from 'App'

const EnumProperty = ({
    enumeration,
    currentKey,
    currentStyle,
    styleProvider,
    value,
    actionUrl
}) => {
    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const openDialog = () => {
        setOpen(true)
    }

    const { setEntity } = useContext(ListContext)
    const current = <Chip
        className={`cursor-pointer hover:-translate-y-1 ${currentKey === 'Unknown' ? 'bg-slate-600 text-white' : currentStyle}`}
        text={app.t(currentKey)}
        onClick={openDialog}
    />

    useEffect(() => {
        var enums = []
        app?.getEnum(enumeration)?.forEach(item => {
            enums.push({ value: item.key, id: item?.id })
        });
        setOptions(enums)
    }, [])

    const ChangeData = ({
        data,
        error,
        setProgress,
        success,
    }) => {
        const { NewEnumId: newEnumId } = data
        const url = `${actionUrl}/?newEnumId=${newEnumId}`
        setProgress(true)
        post(url)
            .then(data => {
                setProgress(false)
                setOpen(false)
                success('Successful status change')
                setEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }
    const inputs = <>
        <Radio
            className="flex flex-row md:flex-row items-start md:items-start"
            controlClassName="flex flex-row gap-3 py-5 justify-center dark:text-white"
            column='NewEnumId'
            options={options}
            display={entity => app.digitGroup(app.t(entity.value))}
            choose={entity => entity.id}
            styleProvider={styleProvider}
            activeClassName="xs:opacity-100"
            hideLabel
            value={value}
            required
        />

    </>

    return <>
        {current}
        <DialogContext.Provider
            value={{
                open,
                setOpen
            }}>
            <div>
                <DialogForm
                    entityType='Enumeration'
                    title='Set new value'
                    inputs={inputs}
                    okAction={ChangeData}
                />
            </div>
        </DialogContext.Provider>
    </>
}

export default EnumProperty
