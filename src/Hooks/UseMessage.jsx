import { useContext } from 'react'
import { PanelContext } from 'Contexts'

const useMessage = () => {

    const {
        setAction,
        setDescription,
        setIsMessageShown,
        setMessage,
        setSeverity,
    } = useContext(PanelContext)

    const show = (data, action, type) => {
        setMessage((data && data.message) ? data.message : data)
        setDescription((data && data.description) ? data.description : undefined)
        setAction(action)
        setSeverity(type)
        setIsMessageShown(true)
    }

    const success = (data, action) => {
        show(data, action, 'success')
    }

    const info = (data, action) => {
        show(data, action, 'info')
    }

    const warning = (data, action) => {
        show(data, action, 'warning')
    }

    const error = (data, action) => {
        show(data, action, 'error')
    }

    const hide = () => {
        setIsMessageShown(false)
    }

    return {
        success,
        info,
        warning,
        error,
        show,
        hide
    }
}

export default useMessage
