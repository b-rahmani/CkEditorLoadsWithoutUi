
import BackDrop from './Backdrop';

export const DrawerTypes = { menu: "menu", filter: "filter" };

const Drawer = (props) => {
    const { isOpen, click, children, type } = props;

    let backdropStyle;
    let drawerStyle;

    switch (type) {
        case DrawerTypes.menu:
            backdropStyle = "lg:hidden z-[60]"
            drawerStyle = `rtl:right-0 dark:bg-zinc-600 ltr:left-0 top-0 h-screen lg:hidden z-[70] ${isOpen ? "ltr:translate-x-[0%] rtl:translate-x-[0%]" : "ltr:translate-x-[-100%] rtl:translate-x-[100%]"
                } `
            break;
        case DrawerTypes.filter:
            backdropStyle = "backdrop-blur-[2px] bg-[#0004] z-[60]"
            drawerStyle = `left-0 bottom-0 h-[90%] rounded-tr-3xl shadow-xl z-[70] ${isOpen ? "translate-x-0" : "translate-x-[-100%]"}`

            break;
        default:
            drawerStyle = "translate-x-full ltr:left-0 rtl:right-0 top-0 h-screen"
    }
    return <>
        <BackDrop
            clicked={click}
            isOpen={isOpen}
            style={backdropStyle}
        />
        <aside className={`w-[248px] bg-white fixed 
         ${drawerStyle} shadow-lg transition-all duration-150 ease-out`}>
            {children}

        </aside>
    </>
}

export default Drawer;
