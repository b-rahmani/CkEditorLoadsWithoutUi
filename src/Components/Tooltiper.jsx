
const Tooltiper = (props) => {
    const { title, className } = props;
    return <p className={`flex max-w-max  bg-stone-500 px-1 py-2 absolute top-0 left-[50%] translate-x-[-50%] opacity-0 translate-y-0   transition-all duration-200 rounded-md z-10 invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-12 pointer-events-none text-white text-center ${className}  `}>
        {title}
        {props.children} </p>
}
export default Tooltiper;
