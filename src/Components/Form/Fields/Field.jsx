import app from 'App'

const Field = ({
    children,
    className,
    helpText,
    hideLabel,
    id,
    isDirty,
    isValid,
    label,
    progress,
    required,
    type
}) => {

    return <div className='field mx-4 mt-4'>
        <div
            className={`${className} flex flex-col md:flex-row justify-start gap-y-2  sm:flex-start md:items-center `}
        // error={(isDirty && !isValid()).toString()}
        // required={required ? true : false}
        // disabled={progress}
        >
            {
                // type !== 'check' &&
                type !== 'upload' && !hideLabel && <label
                    className="w-48 inline-block text-[#112a53] dark:text-white text-sm "
                    htmlFor={id}
                    disabled={progress}
                >
                    <span> {required && '*'} {app.t(label)}</span>
                    <span className=""> : </span>
                </label>
            }
            <div className='w-full'>
                {children}
                {isDirty && !isValid() && <div
                    className="text-sm font-light mt-0.5 text-red-400"
                    disabled={progress}
                >
                    {app.t(helpText) || <span>&nbsp;</span>}
                </div>}
            </div>
        </div>
    </div>
};

export default Field
