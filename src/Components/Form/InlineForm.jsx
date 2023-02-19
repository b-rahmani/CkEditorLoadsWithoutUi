import {
    useEffect,
    useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import app from 'App'
import { useMessage } from 'Hooks'
import { useForm } from 'Hooks'
import { FormContext } from 'Contexts'
import Actions from './Actions'
import Explanations from './Explanations'
import FormElement from './FormElement'

const InlineForm = ({
    actions,
    entityType,
    explanations,
    humanReadableEntityType,
    inputs,
    large,
    loader,
    okAction,
    onLoad,
    progress: externalProgress,
    returnTo,
    submitTo,
    title,
}) => {

    const [contentProgress, setContentProgress] = useState()

    const { error } = useMessage()

    const navigate = useNavigate()
    const { id, entityId } = app.parseQuery()

    const {
        calculatedTitle,
        handleSubmit,
        resetFields,
        setCurrentEntity,
        ...formRest
    } = useForm({
        contentProgress,
        entityId: entityId || id,
        entityType,
        externalProgress,
        humanReadableEntityType,
        loader,
        okAction,
        onSaved: () => { },
        submitTo,
        title,
    })

    useEffect(() => {
        if (onLoad instanceof Function) {
            onLoad({
                error,
                setCurrentEntity,
                setProgress: setContentProgress,
            })
        }
    }, [])

    return <div
        className={"px-6 md:px-12 mx-auto dark:bg-zinc-700 " + (large ? "lg:w-full" : "lg:w-2/3")}
    >
        <h1>{title}</h1>
        <FormContext.Provider value={{
            calculatedTitle,
            handleSubmit,
            resetFields,
            setCurrentEntity,
            ...formRest
        }}>
            <Explanations explanations={explanations} />
            <div className="mb-10"></div>
            <FormElement
                id='form'
                inputs={inputs}
                handleSubmit={handleSubmit}
                isInline
            />
            <Actions
                actions={actions}
                handleSubmit={handleSubmit}
                onCanceled={() => { }}
            />
        </FormContext.Provider>
    </div>
}

export default InlineForm 
