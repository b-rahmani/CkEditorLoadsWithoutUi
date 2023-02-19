import BackDrop from '../Components/Backdrop';
const Modal = (props) => {
    const { children, isOpen, onClose, type } = props;
    return <>
        <BackDrop
            style={"backdrop-blur-[3px] opacity-100 bg-[#0004]"}
            isOpen={isOpen}
            clicked={onClose} />
        <div className={`fixed z-50 top-1/2 left-1/2  rounded-lg shadow-custom  translate-x-[-50%] translate-y-[-50%] items-center   scale-0 transition-all duration-500  md:mx-7 w-96 h-96 bg-white ${isOpen && "scale-100"}`}>
            {children}
        </div>
    </>
}
export default Modal;
