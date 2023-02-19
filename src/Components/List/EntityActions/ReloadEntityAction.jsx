import { useContext } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import app from 'App'
import { ListContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import EntityAction from './EntityAction';

const ReloadEntityAction = () => {

    const { menuForActions, reloadEntity } = useContext(ListContext)
    const { entity } = useContext(EntityContext)

    return <EntityAction
        icon={<ReplayIcon
            className="border border-slate-400 rounded-md w-8 h-8 p-1 group-hover:bg-gray-300 group-hover:fill-blue-600"
        />}
        asMenuItem={menuForActions}
        title={app.t("Reload")}
        click={() => reloadEntity(entity)}
    />
}

export default ReloadEntityAction;