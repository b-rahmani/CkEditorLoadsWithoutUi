import React, {
    useEffect,
    useState,
    version,
} from 'react'
import {
    Helmet,
    HelmetProvider,
} from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import app from 'App'
import { get } from 'App'
import { PanelContext } from 'Contexts'
import { useLocalStorageState } from 'Hooks'
import MainRouting from './MainRouting'
import Drawer from '../Components/Drawer'
import { DrawerTypes } from '../Components/Drawer'
import Menu from './Menu'
import Header from './Header'
import Message from './Message'

const Panel = () => {

    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const [isFilteringOpen, setIsFilteringOpen] = useState(false)

    const [isDark, setIsDark] = useLocalStorageState(false, `isDark`)
    const [maximized, setMaximized] = useLocalStorageState(false, `maximized`)

    const [params, setParams] = useState('')
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')

    const [isMessageShown, setIsMessageShown] = useState()
    const [message, setMessage] = useState()
    const [description, setDescription] = useState()
    const [action, setAction] = useState()
    const [severity, setSeverity] = useState()
    const [progress, setProgress] = useState(false)

    const [branding, setBranding] = useState({
        brand: 'Panel',
        slogan: ''
    })
    const [fakeDataGenerators, setFakeDataGenerators] = useState([])

    // useEffect(() => {
    //     if (maximized) {
    //         setIsMenuOpen(false)
    //     }
    //     else {
    //         setIsMenuOpen(true)
    //     }
    // }, [maximized])

    // useEffect(() => {
    //     if (isDark) {
    //         document.body.classList.add('dark')
    //     }
    //     else {
    //         document.body.classList.remove('dark')
    //     }
    // }, [isDark])

    // useEffect(() => {
    //     window.reactVersion = version
    // }, [])

    // useEffect(() => {
    //     let mediaQuery = window.matchMedia("(max-width: 1023px)")
    //     if (mediaQuery.matches) {
    //         setIsMenuOpen(false)
    //     }
    // }, [location])

    return <HelmetProvider>
        <PanelContext.Provider
            value={{
                action,
                description,
                isDark,
                isFilteringOpen,
                isMenuOpen,
                isMessageShown,
                maximized,
                message,
                setAction,
                setDescription,
                setIsDark,
                setIsFilteringOpen,
                setIsMenuOpen,
                setIsMessageShown,
                setMaximized,
                setMessage,
                setSeverity,
                severity,
                fakeDataGenerators,
            }}
        >
            <Helmet>
                <title>{branding.brand}{branding.slogan && ' - '}{branding.slogan}</title>
            </Helmet>
            {
                app.getLocale().key === 'fa' &&
                <Helmet>
                    <link
                        type="text/css"
                        rel="stylesheet"
                        href="/Fonts/Persian/IranSansX/Font.css" />
                </Helmet>
            }
            {
                app.getLocale().key === 'ar' &&
                <Helmet>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com" />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossorigin
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap"
                        rel="stylesheet"
                    />
                    <link
                        type="text/css"
                        rel="stylesheet"
                        href="/Fonts/Arabic/style.css"
                    />
                </Helmet>
            }
            <input
                type='hidden'
                id='reactVersion'
                value={React.version} />

            <div className='w-full flex justify-between bg-[#f7f9fe] min-h-[100vh] dark:bg-zinc-800'>
                {/* <div className={`my-2  w-full lg:h-[97vh]  hidden lg:flex   transition-all  duration-300  ${isMenuOpen ? "lg:w-[200px]" : "lg:w-16"}`}></div> */}
                <div className={`m-4  w-full lg:h-[96vh] fixed z-10  rtl:right-0 ltr:left-0  hidden lg:flex  transition-all duration-300 rounded-lg shadow-md shadow-black dark:shadow-black bg-gray-50 dark:bg-zinc-700 ${isMenuOpen ? "lg:w-[248px]" : "lg:w-[60px] "}`}>
                    <Menu />
                </div>
                <div className={`pr-0 transition-all duration-300 w-full rtl:mr-auto ltr:ml-auto ${isMenuOpen ? "lg:w-[calc(100%_-_278px)] " : "lg:w-[calc(100%_-_90px)]"}  `}>
                    <Header />
                    <Drawer
                        isOpen={isMenuOpen}
                        click={() => setIsMenuOpen(!isMenuOpen)}
                        type={DrawerTypes.menu}>
                        <Menu />
                    </Drawer>
                    <MainRouting />

                    <Message />
                </div>
            </div>
        </PanelContext.Provider>
    </HelmetProvider >
}

export default Panel
