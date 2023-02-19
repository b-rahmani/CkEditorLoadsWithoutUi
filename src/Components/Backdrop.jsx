const BackDrop = (props) => {

    return <>
        <div className={`w-screen h-screen fixed left-0 top-0 bg-[#000] transition-all duration-100 ease-out ${props.isOpen ? "opacity-60" : "opacity-0"} ${props.isOpen ? "visible" : "invisible"} ${props.style}`}
            onClick={props.clicked}
        >
        </div>
    </>
}

export default BackDrop
