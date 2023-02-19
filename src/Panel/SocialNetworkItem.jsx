import TelegramIcon from '@mui/icons-material/Telegram';
const SocialNetworkItem = (props) => {
    const {id,title,link,icon}=props;
    return <>
        <button className='w-6 h-6 flex justify-center items-center bg-slate-300  hover:bg-blue-300 outline-0 rounded-full'>
            <TelegramIcon className="w-4 h-4 fill-white flex justify-center items-center"/>
        </button>
    </>
}
export default SocialNetworkItem;
