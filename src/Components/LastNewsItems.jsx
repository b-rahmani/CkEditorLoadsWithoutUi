import { Link } from 'react-router-dom';
const LastNewsItems = (props) => {
    return <>
        <Link
            to={props.link}
            className="flex gap-2   md:gap-6 relative before:absolute  before:w-[1px] before:h-[calc(100%+2rem)] before:rounded-sm before:bg-blue-900 before:right-[12px] before:top-7 last:before:hidden">
            <div className="
            rounded-[100%] bg-blue-900 w-6 h-6  shrink-0"></div>

            <p>{props.title}</p>
        </Link>
    </>
}
export default LastNewsItems;
