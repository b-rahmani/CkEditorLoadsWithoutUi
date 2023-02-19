import {
    useContext,
    useState,
} from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import app from 'App'
import Icon from '../../Icon'
import Unify from '../../Unify'
import { useNavigate } from 'react-router-dom';
import { useMessage } from 'Hooks'
import { ListContext } from 'Contexts'
import { DialogContext } from 'Contexts'

const EntityAction = ({
    asMenuItem,
    click,
    closeMenu,
    color,
    dialog,
    entity,
    goTo,
    hoverOnly,
    icon,
    reload,
    setEntity,
    superAdmin,
    title,
    ...rest
}) => {

    const navigate = useNavigate()
    const { success, error } = useMessage()
    const {
        entityType,
        reloadEntity
    } = useContext(ListContext)
    const [open, setOpen] = useState(false)

    const iconStyles = "text-gray-500 group-hover:text-blue-500  dark:text-zinc-500 dark:group-hover:text-blue-500 border border-slate-400 rounded-md w-8 h-8 p-1 group-hover:bg-gray-300"

    const handleClick = (e) => {
        app.selectedItem = entity;
        if (goTo) {
            app.selectedItem = entity;
            if (typeof goTo === 'function') {
                navigate(goTo(entity));
            }
            else {
                navigate(goTo);
            }
        }
        else if (click && typeof click === 'function') {
            click({
                error,
                entity,
                reload,
                setEntity,
                setProgress,
                success,
            })
        }
        else if (dialog) {
            setOpen(true)
        }
        else {
            console.warn(`No action is assigned to entity action. Title is '${title}'`)
        }
        e.stopPropagation()
        e.preventDefault()
        e.nativeEvent.stopPropagation()
        e.nativeEvent.preventDefault()
    }

    const [progress, setProgress] = useState(false);

    if (superAdmin && !app.isSuperAdmin()) {
        return <span className="hidden"></span>
    }

    return <DialogContext.Provider
        value={{
            entity,
            open,
            setOpen,
        }}
    >
        {
            asMenuItem ?
                <>
                    <MenuItem
                        onClick={(e) => {
                            handleClick(e)
                            if (closeMenu && typeof closeMenu === 'function') {
                                // closeMenu()
                            }
                            className = "group"
                        }}>
                        <ListItemIcon>
                            <Icon
                                icon={icon}
                                className={color || iconStyles}
                            />
                        </ListItemIcon>
                        <ListItemText>{app.t(title || "")}</ListItemText>
                    </MenuItem>
                    {
                        dialog && DialogInstanceCloned
                    }
                </>
                :
                <span className="entityAction flex items-center justify-center">
                    {
                        (progress || progress === true)
                            ?
                            <CircularProgress
                                size={24}
                                className="m-2" />
                            :
                            <Tooltip title={app.t(title || "")}>
                                <IconButton
                                    onClick={handleClick}
                                    className="group hover:bg-transparent">
                                    {
                                        <Icon
                                            icon={icon}
                                            className={color || iconStyles}
                                        />
                                    }
                                </IconButton>
                            </Tooltip>
                    }
                    {
                        dialog &&
                        <Unify
                            component={dialog}
                            entity={entity}
                            entityType={entityType}
                            reloadEntity={reloadEntity}
                            setEntity={setEntity}
                            {...rest}
                        />
                    }
                </span >
        }
    </DialogContext.Provider>
};

export default EntityAction 
