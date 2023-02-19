import app from 'App'

const TitleSubtitle = ({
    subtitle,
    supertitle,
    title,
}) => {
    return <div className={"ltr:text-left rtl:text-right"}>
        {
            supertitle &&
            <div className="text-xs text-gray-400">{supertitle}</div>
        }
        <div className="text-lg font-bold text-slate-600 dark:text-slate-400">{title}</div>
        <div className={`text-xs text-gray-400 ${app.isGuid(subtitle) ? 'invisible' : ''}`}>{subtitle}</div>
    </div>
}

export default TitleSubtitle 
