import {
    forwardRef,
    useContext,
} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import app from 'App'
import { useMessage } from 'Hooks'
import { PanelContext } from 'Contexts'

const Alert = forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Message = () => {

    const { hide } = useMessage()

    const {
        description,
        isMessageShown,
        message,
        severity,
    } = useContext(PanelContext)

    const hideMessage = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        hide()
    }

    return <Snackbar
        open={isMessageShown}
        autoHideDuration={6000}
        onClose={hideMessage}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        ContentProps={{
            style: { whiteSpace: 'pre-line' }
        }}
        bodystyle={{ whiteSpace: 'pre-line' }}
    >
        <Alert
            onClose={hideMessage}
            severity={severity || 'success'}
            sx={{ width: '100%' }}
        >
            {
                message && description &&
                <AlertTitle
                    className="font-bold"
                >
                    {app.t(message)}
                </AlertTitle>
            }
            {
                message && description
                    ?
                    <div className="mt-4">{description}</div>
                    :
                    app.t(message)
            }
        </Alert>
    </Snackbar>
}

export default Message
