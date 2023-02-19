import {
    useContext,
    useState,
} from 'react';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Icon from '../../Icon'
import app from 'App'
import { post } from 'App'
import { useMessage } from 'Hooks'
import { ListContext } from 'Contexts'

const BooleanProperty = ({
    actionUrl,
    className,
    column,
    reloadListOnSuccess,
    title,
    value,
}) => {

    const id = `switch_${actionUrl}`

    const { success, error } = useMessage()

    const [progress, setProgress] = useState(false);

    const {
        reload,
        setEntity,
    } = useContext(ListContext) || {}

    const onChange = (e) => {
        if (!actionUrl || app.isNothing(actionUrl)) {
            return;
        }
        setProgress(true);
        var api = actionUrl;
        if (typeof actionUrl === 'function') {
            api = actionUrl(e.target.checked);
        }
        post(api).then(data => {
            setProgress(false);
            success('Applied');
            if (reloadListOnSuccess) {
                reload()
            }
            else {
                setEntity(data)
            }
        }, e => {
            error(e);
            setProgress(false);
        });
    }

    const control = actionUrl
        ?
        <label
            htmlFor={id}
            className="inline-flex relative items-center cursor-pointer">
            <input
                type="checkbox"
                checked={value || false}
                onChange={(e) => onChange(e)}
                id={id}
                className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 relative flex items-center justify-center">
            </div>
        </label>
        :
        <div className={"" + (value === true ? " text-green-600 " : " text-red-600 ")}>
            {
                value === true
                    ?
                    <Icon icon={CheckIcon} />
                    :
                    <Icon icon={ClearIcon} />
            }
        </div>
    return <div className={"property boolean flex items-center justify-center " + (className || '')}>
        {
            progress
                ?
                <CircularProgress
                    size={16}
                    className="my-1"
                />
                :
                title
                    ?
                    <Tooltip title={title || ""}>
                        {
                            control
                        }
                    </Tooltip>
                    :
                    control
        }
    </div>
}

export default BooleanProperty
