import {
    useEffect,
    useState,
} from 'react'
import app from 'App'
import {
    get,
    post,
    upload,
} from 'App'
import { useMessage } from 'Hooks'

const useForm = ({
    entity,
    entityId,
    entityType,
    humanReadableEntityType,
    loader,
    okAction,
    onSaved,
    parentId,
    submitTo,
    title,
}) => {
    // is edit, or is create? get id from somewhere
    // file upload
    // if is edit, load entity (only if they don't provide their own get method)
    // save
    const formMode = {
        creation: 1,
        edition: 2
    }
    const [fields, setFields] = useState([])
    const [progress, setProgress] = useState()
    const [isDirty, setIsDirty] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [currentEntity, setCurrentEntity] = useState()
    const [mode, setMode] = useState(entityId ? formMode.edition : formMode.creation)
    const [calculatedTitle, setCalculatedTitle] = useState('')
    const [hasFile, setHasFile] = useState(false)
    const [extraParams, setExtraParams] = useState()
    const { success, error } = useMessage()

    const addFieldToFormContext = ({ id, ...rest }) => {
        if (!id) {
            return
        }
        for (var i = 0; i < fields.length; i++) {
            if (fields[i].id === id) {
                return
            }
        }
        setFields((previousFields) => {
            return [{
                id,
                ...rest
            }, ...previousFields]
        })
    }

    const setField = ({ id, value, isValid, isDirty }) => {
        setFields((previousFields) => {
            for (var i = 0; i < previousFields.length; i++) {
                if (previousFields[i].id === id) {
                    previousFields[i].value = value
                    previousFields[i].isValid = isValid
                    previousFields[i].isDirty = isDirty
                }
            }
            return [...previousFields]
        })
    }

    const resetFields = () => {
        setFields([])
    }

    useEffect(() => {
        if (loader instanceof Function) {
            loader({
                setEntity: setCurrentEntity,
                setProgress
            })
        }
    }, [])

    // useEffect(() => {
    //     app.updateToken();
    // }, [])

    useEffect(() => {
        if (entityId) {
            setMode(formMode.edition)
        }
    }, [entityId])

    useEffect(() => {
        if (mode === formMode.edition && !entity) {
            loadEntity()
        }
    }, [mode])

    const loadEntity = () => {
        if (!entityId) {
            return
        }
        setProgress(true)
        get(`/${app.camelize(entityType)}/get/${entityId}`)
            .then(data => {
                setProgress(false)
                setCurrentEntity(data)
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    const validate = () => {
        setIsValid(fields.every(i => i.isValid))
    }

    const focusFirstInput = (formId) => {
        var firstField = document.querySelector(`#${formId} .field:first-child input`);
        if (!firstField) {
            firstField = document.querySelector(`#${formId} .field:first-child textarea`);
        }
        if (firstField && firstField.focus) {
            firstField.focus();
        }
    }

    useEffect(() => {
        if (currentEntity && currentEntity.id) {
            setMode(formMode.edition)
        }
        else {
            setMode(formMode.creation)
        }
    }, [currentEntity])

    useEffect(() => {
        if (typeof title === 'string') {
            setCalculatedTitle(title)
        }
        else if (typeof title === 'function') {
            setCalculatedTitle(title(mode))
        }
        else {
            setCalculatedTitle(`${mode === formMode.edition ? 'Edit' : 'Create'} ${humanReadableEntityType || entityType || ""}`)
        }
    }, [mode])

    useEffect(() => {
        validate()
        window.fields = fields;
        window.form = {
            fields,
            isDirty,
            isValid,
        }
        // app.updateToken()
    }, [validate, fields]);

    useEffect(() => {
        validate()
    }, [isDirty])

    const handleSubmit = (event) => {

        if (!isValid) {
            event.preventDefault();
            return;
        }
        var data = hasFile ? new FormData() : {};
        if (hasFile) {
            app.selectedFiles.forEach(file => {
                data.append('file', file);
            });
        }
        new URLSearchParams(window.location.search).forEach((value, key) => data[key] = value);
        for (let i = 0; i < fields.length; i++) {
            const key = fields[i].id.split('_')[1];
            const value = fields[i].value;
            if (hasFile) {
                data.append(key, value);
            }
            else {
                data[key] = fields[i].value;
            }
        }
        if (parentId) {
            data.parentId = parentId;
        }
        if (extraParams instanceof Object) {
            data = { ...data, ...extraParams };
        }
        if (okAction instanceof Function) {
            okAction({
                currentEntity,
                data,
                error,
                setProgress,
                success,
            });
        }
        else {
            setProgress(true);
            let url = '';
            if (submitTo) {
                url += submitTo
            }
            else {
                url += `${app.camelize(entityType)}/`
                if (hasFile) {
                    url += 'upload'
                } else {
                    url += `${mode === formMode.creation ? 'create' : 'update'}`
                }
            }
            if (window.location.search) {
                const query = window.location.search.slice(1);
                if (url.indexOf('?') > -1) {
                    url += '&';
                }
                else {
                    url += '?'
                }
                url += query
            }
            if (mode === formMode.edition) {
                data['id'] = currentEntity.id;
            }
            const method = hasFile ? upload : post
            method(url, data).then(data => {
                success(app.t(`Item ${(mode === formMode.creation ? 'created' : 'updated')} successfully`))
                setProgress(false);
                if (onSaved instanceof Function) {
                    onSaved()
                }
            }, e => {
                error(e);
                setProgress(false);
            })
        }
        event.preventDefault();
    }

    const getValue = (column) => {

    }

    return {
        addFieldToFormContext,
        calculatedTitle,
        currentEntity,
        fields,
        focusFirstInput,
        formMode,
        handleSubmit,
        isDirty,
        isValid,
        loadEntity,
        mode,
        progress,
        resetFields,
        setCurrentEntity,
        setField,
        setFields,
        setHasFile,
        setIsDirty,
        setProgress,
    }
}

export default useForm 
