import { borderStyle } from "./FieldStyle"

const Control = ({ children, className }) => {
    return <div
        className={` ${className} ${borderStyle} py-1.5 px-3 flex w-full group max-w-[600px] relative `}
    >
        {children}
    </div>
}
export default Control
