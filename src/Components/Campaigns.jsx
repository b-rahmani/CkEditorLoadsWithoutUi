import NewCampaigns from "./NewCampaigns";
import DashboardIcon from '../Components/icons/dashboardIcon';
import TableCampaigns from "./TableCampagns";

const Campaigns = (props) => {
        const { table } = props;
        return <div className="my-5 mx-3  rounded-md border-[1px] border-[#eff1f7] shadow-md">

                {!table.length ? <>
                        <div className="flex justify-between items-center gap-2 border-b-[1px] border-slate-200 py-5 mx-4 flex-wrap">
                                <div className="flex gap-2">
                                        <DashboardIcon className="h-6 w-6" />
                                        <p className="text-md"> my last campaign</p>
                                </div>
                                <p>all campaigns:
                                        <span>{table.body.length}</span>
                                </p>
                        </div>
                        <div></div>
                        <div className="w-full flex">
                                <TableCampaigns table={table} />
                        </div>
                </>
                        : <NewCampaigns table={table} />}
        </div>
}
export default Campaigns;
