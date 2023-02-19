import { useContext } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { ListContext } from 'Contexts'
import app from 'App'
import Text from './Filters/Text'

const Filtering = (props) => {

    const { filters } = useContext(ListContext)

    return <>
        <div className="mx-3 py-3 h-full">
            <div className="flex justify-between items-center border-b-[0.4px] border-b-slate-400 py-4">
                <p className='text-sm'>filters</p>
                <button className='text-orange-500 underline text-sm hover:text-red-600'>delete all</button>
                <button
                    className='rounded-[100%] border-2 w-6 h-6 flex justify-center items-center group hover:border-slate-400'
                    onClick={props.close}>
                    <CloseOutlinedIcon className="h-4 w-4 group-hover:scale-[1.2]" />
                </button>
            </div>
            <div className='max-h-[60vh] overflow-y-auto mt-5 mb-2 pt-2 scrollbar flex flex-col gap-4'>
                {
                    (app.isDev() || app.isSuperAdmin()) &&
                    <Text
                        column='Id'
                        operator='equals'
                    />
                }
                {filters}
            </div>
            <div className='w-full bg-white absolute bottom-0 left-0 z-10 flex  border-t-2 border-t-stone-200 py-3'>
                <button className='w-full mx-3 border-none outline-none bg-red-500 flex rounded-lg px-5 py-2 text-white hover:bg-red-600 justify-center'>{app.t("action")}</button>
            </div>
        </div>
    </>
}
export default Filtering
