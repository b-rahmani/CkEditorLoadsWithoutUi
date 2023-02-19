import { Link, NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useContext } from 'react';
import { PanelContext } from 'Contexts';
import app from "App";

const WithoutDropdownMenu = (props) => {
    const { url, icon, title, children } = props;
    const { isMenuOpen } = useContext(PanelContext);

    return <>
        <li className='hover:bg-slate-200 dark:hover:bg-zinc-600 transition-all duration-300 relative group'>
            <NavLink
                to={url}
                className={({ isActive }) =>
                    `px-4 flex  gap-8 lg:gap-3 items-center py-4 ${!isMenuOpen && "lg:justify-center"} ${isActive ? "bg-gray-400 dark:bg-gray-900" : null}`}>
                <DashboardIcon className={`w-5 h-5 fill-slate-400 dark:fill-white ${!isMenuOpen && "lg:w-7 lg:h-7"}`} />
                <p className={`text-sm font-medium text-slate-900 dark:text-white ${!isMenuOpen && "lg:hidden"}`}>  {app.t(title)}</p>
                <div className='opacity-0 group-hover:opacity-100 w-2 h-5 rounded-xl bg-red-500 absolute rtl:right-[-4px] ltr:left-[-4px] top-1/2 translate-y-[-50%]'></div>
            </NavLink>
        </li>
    </>
}
export default WithoutDropdownMenu;
