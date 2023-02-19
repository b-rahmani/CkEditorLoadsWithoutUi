import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import AcUnitIcon from '@mui/icons-material/AcUnit'
import LoginedUserBtn from '../Components/LoginedUserBtn'
import {
    useState,
    useEffect,
    useContext,
} from 'react'
import { PanelContext } from 'Contexts'
import Maximize from './HeaderActions/Maximize'
import FullScreen from './HeaderActions/FullScreen'
import DarkMode from './HeaderActions/DarkMode'
import ClearCache from './HeaderActions/ClearCache'
import HeaderActions from '../HeaderActions'

const Header = () => {

    const { isMenuOpen, setIsMenuOpen } = useContext(PanelContext)
    const [isSticyOn, setIsSticyOn] = useState(false)
    useEffect(() => {

        window?.addEventListener('scroll', handleScroll)
        return () => {
            window?.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = (e) => {
        if (window?.pageYOffset > 0) {
            setIsSticyOn(true)
        } else {
            setIsSticyOn(false)
        }
    }

    return <>
        <header className={`px-3 py-1 px-4 bg-[#f7f9fe] transition duration-300 sticky top-0 z-40  ${isSticyOn && "shadow-header"} grid place-items-end	`}>
            <div className='flex justify-between items-center'>
                <div className="flex items-center gap-2 order-2">
                    <MenuRoundedIcon
                        className="w-9 h-9 hover:bg-slate-200 p-1 rounded-full lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />
                    {/* <AccountBalanceWalletOutlinedIcon className="w-6 h-6" />‍‍
                    <p className='text-xs hidden md:flex'> Wallet balance </p>
                    <p className='text-sm'>
                        <span> 0 </span>
                        Tomans
                    </p>
                    <PlusIcon className="fill-green-500 h-6 w-6" /> */}
                </div>
                <div className="flex items-center gap-2 order-1">
                    {/* <Maximize /> */}
                    <ClearCache />
                    <DarkMode />
                    <FullScreen />
                    <HeaderActions />
                    <LoginedUserBtn />
                </div>
            </div>

        </header>
    </>
}
export default Header
