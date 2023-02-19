import Tooltip from '@mui/material/Tooltip'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'
import app from 'App'
import {
    useContext,
    useState,
} from 'react'
import {
    useNavigate,
    useSearchParams,
} from 'react-router-dom'
import { ListContext } from 'Contexts'
import Icon from '../../Icon'
import { useMessage } from 'Hooks'

const ListAction = ({
    click,
    icon,
    minCardinality,
    text,
    title,
    url,
}) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [progress, setProgress] = useState(false)
    const {
        selectedEntities,
        reload
    } = useContext(ListContext);
    const { success, error } = useMessage()

    const button = <Button
        variant="contained"
        disabled={progress || (minCardinality && minCardinality > selectedEntities.length)}
        startIcon={
            progress
                ?
                <CircularProgress
                    size={20}
                />
                :
                <Icon icon={icon} />
        }
        /* Icon creates 321 error in production build */
        onClick={() => {
            if (url) {
                if (typeof url === 'string') {
                    navigate(url)
                }
                else if (url instanceof Function) {
                    navigate(url(searchParams))
                }
            }
            else if (click instanceof Function) {
                click({
                    error,
                    reloadList: reload,
                    setProgress,
                    success,
                })
            }
        }}
        className='mx-2 mt-2 lg:mt-0 gap-3 disabled:text-white '
    >
        {app.t(text || title)}
    </Button>

    return <span className="listAction">
        {
            title
                ?
                <Tooltip title={app.t(title || "")}>
                    <span>
                        {button}
                    </span>
                </Tooltip>
                :
                button
        }
    </span>
};

export default ListAction 
