import DashboardIcon from '../Components/icons/dashboardIcon';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
const NewCampaigns=()=>{
    return <>
    <div className="flex justify-start items-center gap-2 border-b-[1px] border-slate-200 py-5 mx-4">

        <DashboardIcon className="h-6 w-6" />
        <p className="text-md"> new campain</p>
    </div>

    <div className="flex justify-center flex-col items-center">

        <p className="text-md font-medium mt-8 mb-4">You have not created any campaigns yet
        </p>
        <p className="text-md font-bold">Create your campaign now!
        </p>

        <button className=" gap-4 p-2 my-7 flex justify-around items-center  hover:scale-95  hover:bg-red-700 mx-auto transition- duration-300 ease-in rounded-lg bg-red-600">
            <AddCircleOutlineOutlinedIcon className="fill-white h-4 w-4" />
            <p className="text-white">Create a new campaign</p>
        </button>
    </div>
    </>
}
export default NewCampaigns;
