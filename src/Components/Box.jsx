const Box=(props)=>{
    const {className,children}=props;
    return <div className={`my-5 mx-3  rounded-md border-[1px] border-[#eff1f7] shadow-md ${className}`}>
{children}
    </div>
}
export default Box; 
