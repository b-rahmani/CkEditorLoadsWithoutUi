import Dropdown from './Dropdown';

const FilterItem = (props) => {
    const { title, placeholder, items } = props;
    return <>
        <div className='my-5 relative'>
            <p className='block font-bold text-slate-600 py-3 select-none'>{title}</p>
            <Dropdown
                placeholder={placeholder}
                items={items}
            />
        </div>

    </>
}

export default FilterItem;
