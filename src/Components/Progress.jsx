import CircularProgress from '@mui/material/CircularProgress'

const Progress = ({
    className,
    size,
}) => {
    return <span
        className={className || ""}
    >
        {
            size
                ?
                <CircularProgress
                    size={size}
                />
                :
                <CircularProgress />
        }
    </span>
}

export default Progress
