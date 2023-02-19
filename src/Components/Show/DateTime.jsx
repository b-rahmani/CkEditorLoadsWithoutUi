import DatePart from './DatePart'
import TimePart from './TimePart'

const DateTime = ({ date }) => {
    return <>
        <DatePart date={date} />
        <br />
        <TimePart
            date={date}
            className="text-xs"
        />
    </>
}

export default DateTime 
