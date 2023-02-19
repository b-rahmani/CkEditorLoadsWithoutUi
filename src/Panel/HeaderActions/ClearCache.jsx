import HeaderAction from '../HeaderAction'
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import RotateRightOutlinedIcon from '@mui/icons-material/RotateRightOutlined';
import { useMessage } from 'Hooks'
import { post } from 'App'

const ClearCache = () => {
    const {
        error,
        success,
    } = useMessage()
    const getClearCache = () => {
        post('cache/clear', {}).then(data => success("Published"));
    }

    return <HeaderAction
        action={getClearCache}
        icon={RotateRightOutlinedIcon}
        title="clear cache"
    />
}
export default ClearCache
