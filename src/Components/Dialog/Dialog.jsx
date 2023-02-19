import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PrimaryAction from './PrimaryAction';
import app from 'App'
import { DialogContext } from 'Contexts'
import { useContext } from 'react';

const Dialog = ({
    title,
    content,
    actions,
    large,
    tiny,
    onEntered,
    onClosed
}) => {

    const dialogContext = useContext(DialogContext)
    const { open, setOpen } = dialogContext || {}

    return <MuiDialog
        open={open}
        onClose={() => {
            setOpen(false)
            onClosed instanceof Function && onClosed(false)
        }}
        PaperProps={{
            className: "dark:bg-zinc-700"
        }}
        id="dialog"
        fullWidth
        maxWidth={large ? 'md' : (tiny ? 'xs' : 'sm')}
        TransitionProps={{
            onEntered: onEntered
        }}
    >
        <DialogTitle id="dialogTitle">{app.t(title)}</DialogTitle>
        <DialogContent className="transition-all">
            {
                typeof content === 'string'
                    ?
                    <DialogContentText id="dialogContent">
                        {content}
                    </DialogContentText>
                    :
                    content
            }
        </DialogContent>
        <DialogActions>
            {
                actions
                    ?
                    actions
                    :
                    <PrimaryAction
                        text='Ok'
                        click={() => {
                            setOpen(false)
                            onClosed instanceof Function && onClosed()
                        }}
                    />
            }
        </DialogActions>
    </MuiDialog>
}

export default Dialog
