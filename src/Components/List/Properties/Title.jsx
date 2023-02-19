const Title = ({
    children,
    tooltip,
}) => {

    const props = {}
    if (tooltip) {
        props.title = tooltip
    }

    return <div
        className="text-md font-semibold truncate text-gray-800"
        {...props}
    >
        {children}
    </div>
}

export default Title
