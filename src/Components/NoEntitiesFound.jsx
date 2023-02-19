import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import app from 'App'

const NoEntitiesFound = ({
    icon,
    title,
    description,
    ctaText
}) => {
    return <div className="flex justify-center items-center gap-5 py-5">
        <WarningAmberOutlinedIcon className="h-5 w-5  fill-slate-400" />
        <p className="text-sm text-slate-500">{app.t("No items found")}</p>
    </div>
}

export default NoEntitiesFound
