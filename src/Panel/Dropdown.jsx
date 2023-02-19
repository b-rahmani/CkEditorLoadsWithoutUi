import { useState } from 'react';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
const Dropdown = (props) => {
    const { placeholder, items } = props;
    const [isOpen, setIsOpen] = useState(false);
    return <>
        <div
            className='p-2 w-full rounded-lg border-[1px] hover:border-stone-700 active:border-stone-700  flex justify-between items-center'
            onClick={() => setIsOpen(prev => !prev)}
        >
            <p className='text-slate-500 select-none'>
                {placeholder}
            </p>
            <ArrowDropDownOutlinedIcon className={`h-4 w-4  transition-all duration-300 ${isOpen && "rotate-180"}`} />
            <div className={`absolute left-0 top-[101%] w-full bg-slate-100 rounded-lg border-[1px]  shadow-xl  z-10 
${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
                {items.map(selectItem => <div key={selectItem.id}>
                    <p className="p-2 py-3  hover:bg-slate-200"  >{selectItem.title}</p>
                </div>)}
                {/* <p className="p-2 py-3  hover:bg-slate-200"> item 1</p>   
<p className="p-2 py-3  hover:bg-slate-200"> item 1</p>   

<p className="p-2 py-3  hover:bg-slate-200"> item 1</p>   

<p className="p-2 py-3  hover:bg-slate-200"> item 1</p>    */}
            </div>
        </div>
    </>
}

export default Dropdown;
