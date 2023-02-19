import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import app from 'App'
import { useMessage } from 'Hooks'
import { useForm } from 'Hooks'
import { FormContext } from 'Contexts'
import Actions from './Actions'
import Explanations from './Explanations'
import FormElement from './FormElement'
import Page from '../Page/Page'
import Icon from '../Icon'

const PageForm = ({
    actions,
    breadcrumbItems,
    details,
    entityType,
    explanations,
    hasSideActions,
    humanReadableEntityType,
    icon,
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

    const navigate = useNavigate();
    const { id, entityId } = app.parseQuery()

    const cancel = () => {
        resetFields()
        if (returnTo) {
            navigate(returnTo)
        }
        else {
            navigate(-1)
        }
    }

    const {
        calculatedTitle,
        currentEntity,
        handleSubmit,
        resetFields,
        setCurrentEntity,
        ...formRest
    } = useForm({
        entityId: entityId || id,
        entityType,
        externalProgress,
        humanReadableEntityType,
        loader,
        okAction,
        onSaved: cancel,
        submitTo,
        title,
    })

    useEffect(() => {
        app.checkLogin()
        if (onLoad instanceof Function) {
            onLoad({
                error,
                setCurrentEntity,
                setProgress: setContentProgress,
            })
        }
    }, [])

    const setBreadcrumbItems = () => {
        switch (typeof breadcrumbItems) {
            case "function":
                return breadcrumbItems(currentEntity)
            case "object":
                return breadcrumbItems
            default:
                break;
        }
    }

    return <Page
        title={calculatedTitle}
        details={details}
        breadcrumbItems={setBreadcrumbItems()}
    >
        <div className='flex flex-col md:flex-row gap-4 items-start'>
            <div className={"inc-700 border border-[#d7ddef] rounded-lg w-full " + (large ? "md:w-full" : "md:w-2/3")}
            >
                <FormContext.Provider value={{
                    calculatedTitle,
                    currentEntity,
                    handleSubmit,
                    resetFields,
                    setCurrentEntity,
                    ...formRest
                }}>
                    <div
                    // className="border-b border-b-[#eff1ed] m-4 pb-4 text-slate-600 flex gap-2 items-center "
                    >
                        {/* {icon && <Icon icon={icon} />}
                        <span className="block align-middle	font-bold ">{calculatedTitle}</span> */}
                    </div>
                    <Explanations explanations={explanations} />
                    {/* <Actions
                    actions={actions}
                    handleSubmit={handleSubmit}
                    onCanceled={cancel}
                /> */}
                    <div className="mb-10"></div>
                    <FormElement
                        id='form'
                        inputs={inputs instanceof Function ? inputs(currentEntity || {}) : inputs}
                        handleSubmit={handleSubmit}
                    />
                    <Actions
                        actions={actions}
                        handleSubmit={handleSubmit}
                        onCanceled={cancel}
                    />
                </FormContext.Provider>
            </div>
            {
                hasSideActions &&
                <div className='grow w-full md:w-auto bg-white dark:bg-zinc-700 border border-[#d7ddef] rounded-lg p-4  sticky top-20 left-0'>
                    side actions
                </div>
            }
        </div>
    </Page >
}

export default PageForm 
