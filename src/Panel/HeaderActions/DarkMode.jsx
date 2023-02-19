import { useContext } from 'react'
import HeaderAction from '../HeaderAction';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { PanelContext } from 'Contexts'

const DarkMode = () => {
    const { isDark, setIsDark } = useContext(PanelContext)
    return <HeaderAction
        action={() => setIsDark(prev => !prev)}
        icon={isDark ? LightModeOutlinedIcon : DarkModeOutlinedIcon}
        title="dark mode"
    />
}
export default DarkMode;
