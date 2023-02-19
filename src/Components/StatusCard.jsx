import { Link } from 'react-router-dom';
import DashboardIcon from '../Components/icons/dashboardIcon';

const StatusCard = (props) => {
    return <>
        <div className="px-3 py-5 rounded-md border-[1px] border-[#eff1f7] shadow-md">
            <Link
                to={props.link}
                className="flex justify-between items-center mb-3">
                <p className="text-sm font-bold text-slate-700">{props.title}</p>
                <div className="w-10 h-10 bg-orange-100 rounded-full  flex justify-center items-center">
                    <DashboardIcon className="fill-orange-500 w-4 h-4" />
                </div>
            </Link>
            <ul className="flex flex-col gap-2">
                {props.items.map(item => <li
                    key={item.id}
                    className="flex items-center justify-between mx-1">
                    <p className="text-xs">{item.title}</p>
                    <p>{item.count}</p>
                </li>
                )}
            </ul>
        </div>
    </>
}
export default StatusCard;
