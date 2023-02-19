import DashboardIcon from '@mui/icons-material/Dashboard'
import { BlogMenu } from 'Blog'

const menuItems = [
    {
        title: "Dashboard",
        icon: DashboardIcon,
        url: '/'
    },
    ...BlogMenu
]

export default menuItems
