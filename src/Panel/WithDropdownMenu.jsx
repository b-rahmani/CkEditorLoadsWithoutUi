import { Disclosure } from '@headlessui/react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { PanelContext } from 'Contexts';
import app from "App";
import Icon from '../Components/Icon'

const WithDropdownMenu = (props) => {
    const { url, icon, title, children } = props;
    const { isMenuOpen } = useContext(PanelContext);
    return <Disclosure
        as="li"
        className="mt-2 group">
        {({ open }) => <>
            <Disclosure.Button className="w-full flex gap-8 items-center py-4  hover:bg-slate-200 dark:hover:bg-zinc-600 transition-all duration-300 relative z-[30]">
                <div className={`w-full flex  gap-8 lg:gap-3 justify-start  px-4 ${!isMenuOpen && "lg:justify-center"}`}>
                    {/* <DynamicIcon className="w-5 h-5"/> */}
                    <Icon
                        icon={icon}
                        className={`h-5 w-5 fill-slate-400 dark:fill-white ${!isMenuOpen && "lg:w-7 lg:h-7"}`}
                    />
                    {/* <DashboardIcon className={`h-5 w-5 fill-slate-400 ${!isMenuOpen && "lg:w-7 lg:h-7"}`} /> */}
                    <p className={`text-sm font-medium text-slate-900 dark:text-white ${!isMenuOpen && "lg:hidden"}`}>{app.t(title)}</p>
                    <div className='opacity-0 group-hover:opacity-100 w-2 h-5 rounded-xl bg-red-500 absolute rtl:right-[-4px] ltr:left-[-4px] top-4'></div>
                    <ChevronLeftOutlinedIcon
                        className={`${open ? 'rotate-[-90deg] transform' : 'ltr:rotate-[180deg]'} h-5 w-5 text-slate-500 dark:fill-white   mr-auto ${!isMenuOpen && "lg:hidden"}`}
                    />
                </div>
            </Disclosure.Button>
            <Disclosure.Panel className={`w-full py-2 text-sm text-gray-500 relative z-[2] group ${!isMenuOpen && "lg:hidden"}`}>
                {
                    children
                        .filter(item => {
                            if (item.superAdmin === true) {
                                return app.isSuperAdmin()
                            }
                            else {
                                return true
                            }
                        })
                        .map((menuItem, index) => (
                            <NavLink
                                to={menuItem.url}
                                key={index}
                                className={({ isActive }) =>
                                    `w-full flex  gap-8 items-center py-4 hover:bg-slate-200 dark:hover:bg-zinc-600 transition-all duration-300 ${isActive ? "bg-gray-400 dark:bg-gray-900" : null}`}>
                                <p className={`
                            rtl:mr-16 ltr:ml-16 text-sm font-medium text-slate-900 dark:text-white`}>{app.t(menuItem.title)}</p>
                            </NavLink>
                        ))
                }
            </Disclosure.Panel>
            <div className={`hidden lg:block opacity-0 invisible w-52 h-[800px] absolute z-[21] top-1/2 rtl:right-[100%] rounded-lg translate-y-[-30%] rtl:translate-x-[140%] ltr:translate-x-[-100%] transition-all duration-500 delay-75 bg-slate-50 dark:bg-zinc-700 shadow-xl pointer-events-auto ${!isMenuOpen && "group-hover:lg:opacity-100 group-hover:lg:visible rtl:group-hover:lg:translate-x-2 ltr:group-hover:lg:translate-x-[30%]"}`}>
                <div className='mx-2 flex justify-center items-center p-2'>
                    <p className='text-slate-500 dark:text-white'>{app.t(title)}</p>
                </div>
                <div className='flex flex-col mt-5'>
                    {
                        children
                            .filter(item => {
                                if (item.superAdmin === true) {
                                    return app.isSuperAdmin()
                                }
                                else {
                                    return true
                                }
                            })
                            .map((menuItem, index) => (
                                <NavLink
                                    to={menuItem.url}
                                    key={index}
                                    className={({ isActive }) =>
                                        `p-2 w-full flex gap-8 items-center justify-start py-4 hover:bg-slate-200 dark:hover:bg-zinc-600 transition-all duration-300 ${isActive ? "bg-gray-400 dark:bg-gray-900" : null}`}>
                                    <p className={`
                             mx-2 text-sm font-medium text-slate-900 dark:text-white`}>{app.t(menuItem.title)}</p>
                                </NavLink>)
                            )
                    }
                </div>

            </div>
        </>
        }
    </Disclosure>
}

export default WithDropdownMenu;
