import {
    useContext,
    useEffect,
    useState,
} from 'react'
import {
    useForm,
    useMessage,
} from 'Hooks'
import {
    DialogContext,
    FormContext,
    ListContext,
} from 'Contexts'
import Dialog from '../Dialog/Dialog'
import FormElement from './FormElement'
import Explanations from './Explanations'
import Actions from './Actions'

const DialogForm = ({
    actions,
    close,
    entityType,
    explanations,
    humanReadableEntityType,
    inputs,
    large,
    okAction,
    okText,
    onLoad,
    progress: externalProgress,
    title,
    ...rest
}) => {

    const [contentProgress, setContentProgress] = useState()

    const { error } = useMessage()

    const {
        dialogProps,
        reload,
    } = useContext(ListContext)

    const dialogContext = useContext(DialogContext)
    const {
        entity,
        open,
        parentId,
        setOpen,
    } = dialogContext || {}

    const [entityId, setEntityId] = useState(null)

    const onSaved = () => {
        setOpen(false)
        resetFields()
        reload()
    }

    const onCanceled = () => {
        setOpen(false)
        resetFields()
    }

    const {
        calculatedTitle,
        currentEntity,
        focusFirstInput,
        handleSubmit,
        resetFields,
        setCurrentEntity,
        ...formRest
    } = useForm({
        entityId,
        entityType,
        externalProgress,
        humanReadableEntityType,
        okAction,
        onSaved: onSaved,
        parentId,
        title,
    })

    useEffect(() => {
        setCurrentEntity(entity)
    }, [entity])

    useEffect(() => {
        if (open && onLoad instanceof Function) {
            onLoad({
                error,
                setProgress: setContentProgress,
            })
        }
    }, [open])

    return <FormContext.Provider
        value={{
            currentEntity: currentEntity,
            ...formRest
        }}
    >
        <Dialog
            title={calculatedTitle}
            content={<>
                <Explanations explanations={explanations} />
                <FormElement
                    id='dialogForm'
                    inputs={inputs instanceof Function ? inputs(currentEntity || {}) : inputs}
                    handleSubmit={handleSubmit}
                />
            </>}
            actions={<Actions
                actions={actions}
                handleSubmit={handleSubmit}
                hasCancel
                okText={okText}
                onCanceled={onCanceled}
            />}
            onEntered={() => {
                focusFirstInput('dialogForm')
            }}
            large={large}
            onClosed={onCanceled}
            {...rest}
        />
    </FormContext.Provider >
}

export default DialogForm
