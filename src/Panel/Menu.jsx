import BiotechIcon from '@mui/icons-material/Biotech';
import WithDropdownMenu from "./WithDropdownMenu";
import WithoutDropdownMenu from "./WithoutDropdownMenu";
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from 'react-router-dom';
import SocialNetworkItem from './SocialNetworkItem';
import { useContext } from 'react';
import { PanelContext } from 'Contexts';
import app from 'App';
import menuItems from '../Menu';

// todo: throw exceptions, if two menu items with the same title and path are added

const Menu = () => {

    const { isMenuOpen, setIsMenuOpen } = useContext(PanelContext);

    const socialNetwork = [
        {
            id: 1,
            title: "",
            link: "",
            icon: ""

        }, {
            id: 2,
            title: "",
            link: "",
            icon: ""

        }, {
            id: 3,
            title: "",
            link: "",
            icon: ""

        }, {
            id: 4,
            title: "",
            link: "",
            icon: ""

        },
    ]

    let items = menuItems;
    if (app.isDev()) {
        items = [...menuItems, {
            title: 'Test',
            icon: BiotechIcon,
            url: '/test'
        }]
    }

    return <>
        <div className="w-full py-2 flex flex-col h-[100%]">
            <div className='w-full'>
                <div className={`flex justify-end mx-2 ${!isMenuOpen && "lg:justify-center mx-0"}`}>
                    <MenuRoundedIcon
                        className="w-9 h-9 hover:bg-slate-200 dark:hover:bg-zinc-600 fill-slate-500 dark:fill-white p-1 rounded-full hidden lg:flex"
                        onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
                <div className='border-b-4 border-red-600 px-4 py-4 flex justify-center items-center'>
                    <Link
                        to="/"
                        className={`h-[40px]] flex gap-2 items-center ${!isMenuOpen && "lg:justify-center"}`}>
                        {/* <MuseumOutlinedIcon className="lg:w-8 lg:h-8" /> */}
                        <img
                            src='/images/logo.png'
                            alt="logo"
                            className='w-8 h-8' />
                        <p className={`text-slate-500 ${!isMenuOpen && "lg:hidden"}`}>|</p>
                        <p className={`text-red-500 ${!isMenuOpen && "lg:hidden"}`}>{app.t('paydar samane')}</p>
                    </Link>
                </div>
                <div className='my-5 relative'>
                    <div className={`px-4 ${!isMenuOpen && "lg:px-0"}`}>
                        {/* <button className={`w-full hover:w-[96%] relative  hover:bg-red-700 mx-auto transition-all duration-300  ease-in rounded-lg bg-red-600 flex  justify-evenly  items-center  py-3 ${!isMenuOpen && "lg:rounded-none hover:w-[100%]"}`}>
                            <PlusIcon className={`w-5 h-5 fill-white  ${!isMenuOpen && "lg:absolute lg:left-[50%] -translate-x-1/2 lg:h-6 lg:w-6 "}`} />
                            <p className={`text-white text-xs font-light  relative lg:scale-100 transition-all duration-300 delay-300  ${!isMenuOpen && "lg:scale-0 lg:-z-1 duration-100 delay-[0ms]"}`}>Create a new combination</p>

                        </button> */}
                        <button className={`w-full hover:w-[96%]   hover:bg-red-700 mx-auto transition-all duration-300  ease-in rounded-lg bg-red-600 flex  justify-center  items-center gap-2  py-3 ${!isMenuOpen && "lg:rounded-none hover:w-[100%] justify-center "}`}>
                            {/* <PlusIcon className={`w-5 h-5 fill-white transition-all duration-300  ${!isMenuOpen && "lg:h-6 lg:w-6 "}`} /> */}
                            <p className={`text-white text-xs font-light ${!isMenuOpen && "hidden overflow-hidden"}`}>Create a new combination</p>

                        </button>
                    </div>
                </div>
            </div>
            <ul className='grow scrollbar overflow-y-auto border-y border-slate-200 dark:border-y mt-5'>
                {
                    items
                        .filter(item => {
                            if (item.superAdmin === true) {
                                return app.isSuperAdmin()
                            }
                            else {
                                return true
                            }
                        })
                        .map((menu, index) => {
                            return menu.children?.length > 0
                                ?
                                <WithDropdownMenu key={index} {...menu} />
                                :
                                <WithoutDropdownMenu key={index} {...menu} />
                        })}
            </ul>

            <div className='w-full'>
                <div className={` w-[60%] mx-auto border-t-[1px] border-zinc-200 py-4 flex ${!isMenuOpen && "lg:flex-col lg:gap-3"} transition-all duration-200 justify-between items-center`}>
                    {socialNetwork.map(social => <SocialNetworkItem
                        key={social.id}
                        {...social}
                    />)}

                </div>
            </div>
        </div>
    </>
}

export default Menu;
