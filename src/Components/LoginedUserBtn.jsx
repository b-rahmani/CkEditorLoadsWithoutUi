import app from 'App'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import {
    Link,
    useNavigate,
} from 'react-router-dom';
import {
    Transition,
    Menu,
} from '@headlessui/react';
import { Fragment } from 'react'

const LoginedUserBtn = () => {

    const navigate = useNavigate();
    const exitClickHandler = () => {
        localStorage.removeItem("authenticationToken")
    }
    return <>
        <div className="flex justify-center items-center relative rounded-lg hover:bg-slate-300 transition-colors duration-200 px-2">
            <Menu
                as="div"
                className="relative inline-block text-left">
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="inline-flex w-full items-center justify-center rounded-md   py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">

                                <ArrowDropDownIcon
                                    className={`w-5 h-5 fill-black transition-all duration-500 ${open && "rotate-180"}`}
                                    aria-hidden="true"
                                />
                                <p className="text-sm text-black hidden lg:flex px-1 md:px-2">{app?.user()}</p>
                                <div className="rounded-full w-8 h-8 bg-stone-500 text-white text-lg flex justify-center items-center">
                                    {app.user().toUpperCase().slice(0, 1)}
                                </div>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95">
                            <Menu.Items
                                as="ul"
                                className="flex flex-col justify-center shadow-custom absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">

                                <Menu.Item
                                    as="li"
                                    className="pb-2 hover:bg-slate-300 py-3 px-4">
                                    <Link
                                        to={"/dashboard"}
                                        className=" flex justify-start items-center gap-3">
                                        {/* <DashboardIcon className="w-5 h-5" /> */}
                                        <p className="text-sm"> {app.t("Dashboard")}</p>
                                    </Link>
                                </Menu.Item>

                                <Menu.Item
                                    as="li"
                                    className="pb-2 hover:bg-slate-300 py-3 px-4">
                                    <Link
                                        to={"/account"}
                                        className=" flex justify-start gap-3 items-center">
                                        {/* <AccountIcon className="w-5 h-5" /> */}

                                        <p className="text-sm">{app.t("User account settings")}</p>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item
                                    as="li"
                                    className="pb-2 hover:bg-slate-300 py-3 px-4">
                                    <div
                                        onClick={exitClickHandler}
                                        className="flex justify-start gap-3 items-center cursor-pointer">
                                        {/* <ExitIcon className="fill-orange-600 w-6 h-6" /> */}

                                        <p className="text-orange-600 text-sm">{app.t("Exit")}</p>
                                    </div>
                                </Menu.Item>

                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        </div>
    </>
}
export default LoginedUserBtn;
