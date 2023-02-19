const TimePart = ({
    className,
    date,
}) => {
    const normalizedValue = (date && date.endsWith('Z')) ? date : (date + 'Z')
    return date ? <span
        dir="ltr"
        className={className || ""}
    >
        {
            new Date(normalizedValue).toLocaleTimeString()
        }
    </span> : null
}

export default TimePart 
