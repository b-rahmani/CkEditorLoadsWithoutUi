
const Chip = ({
    className,
    onClick,
    text,
}) => {
    return <>      
        <span
            className={`px-5 py-2 shadow-xl inline-block min-w-5 transition-all duration-500 rounded-lg mx-auto ${className}`}
            onClick={() => {
                onClick instanceof Function && onClick()
            }}
        >
            {text}
        </span>       
    </>
}

export default Chip
