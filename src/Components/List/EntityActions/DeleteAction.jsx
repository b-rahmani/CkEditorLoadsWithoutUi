import {
    useContext,
    useState,
} from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import WarningIcon from '@mui/icons-material/Warning'
import CircularProgress from '@mui/material/CircularProgress'
import EntityAction from './EntityAction'
import Icon from '../../Icon'
import Dialog from '../../../Components/Dialog/Dialog'
import OkCancel from '../../../Components/Dialog/OkCancel'
import app from 'App'
import { post } from 'App'
import { useMessage } from 'Hooks'
import { ListContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import { DialogContext } from 'Contexts'

const DeleteAction = () => {

    const [open, setOpen] = useState(false)
    const [progress, setProgress] = useState(false)

    const {
        entityType,
        menuForActions,
        reload,
    } = useContext(ListContext)
    const { entity } = useContext(EntityContext)
    const {
        error,
        success,
    } = useMessage()

    const deleteItem = () => {
        setOpen(false)
        setProgress(true)
        post(`${app.camelize(entityType)}/delete/${entity.id}`).then(data => {
            success(app.t("Deleted successfully"))
            setProgress(false)
            reload()
        }, e => {
            error(e)
            setProgress(false)
        })
    }

    const confirmationDialog = <DialogContext.Provider
        value={{
            open,
            setOpen
        }}
    >
        <Dialog
            tiny
            title={app.t('Confirmation')}
            content={<div className="flex justify-center items-center flex-col sm:flex-row">
                <Icon
                    icon={WarningIcon}
                    className="text-red-400 text-5xl ltr:mr-4 rtl:ml-4" />
                <span>
                    {app.t('Are you sure you want to delete this item?')}
                </span>
                {/* todo: Show some information form the selected item, to enhance UX */}
            </div>}
            actions={<OkCancel
                okText='Yes'
                cancelText='No'
                cancelClick={() => setOpen(false)}
                okClick={deleteItem}
            />}
        />
    </DialogContext.Provider>

    return <>
        {
            entity.isVital && !app.isSuperAdmin()
                ?
                null
                : <>
                    {confirmationDialog}
                    {
                        progress
                            ?
                            <CircularProgress
                                size={24}
                                className="m-2"
                            />
                            :
                            <EntityAction
                                icon={<DeleteForeverOutlinedIcon className="border border-red-400 rounded-md w-8 h-8 p-1 group-hover:bg-gray-300 group-hover:fill-red-600"
                                />}
                                title={app.t("Delete")}
                                asMenuItem={menuForActions}
                                click={(e) => {
                                    setOpen(true)
                                }}
                            />
                    }
                </>
        }
    </>
}

export default DeleteAction
