import React,
{
    useContext,
    useState,
} from 'react';
import { ListContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import app from 'App'
import DataObjectIcon from '@mui/icons-material/DataObject';
import Dialog from '../../Dialog/Dialog';
import EntityAction from './EntityAction';

const ViewRecordAction = () => {

    const [open, setOpen] = useState(false)
    const { menuForActions } = useContext(ListContext)
    const { entity } = useContext(EntityContext)

    const getJsonHtml = (obj, level) => {
        if (!obj) {
            return <span className="ml-2 ml-4 ml-6 ml-8 ml-10"></span>
        }
        return <ul
            className="leading-4"
            dir='ltr'>
            <li className={"text-orange-600 ml" + level * 2}>{'{'}</li>
            {
                Object.getOwnPropertyNames(obj).map(propertyName => {
                    const property = obj[propertyName]
                    return <li key={propertyName}>
                        <span className="font-bold text-purple-900 font-mono px-2 ml-8 inline-block rounded">{propertyName}<span>:</span> </span>
                        {
                            typeof property === 'object' && property != null
                                ?
                                <span className="ml-10 block">
                                    {getJsonHtml(property, level + 1)}
                                </span>
                                :
                                <span className="inline-block ml-1">
                                    {
                                        obj[propertyName] === null
                                            ?
                                            <span className="text-gray-400">null</span>
                                            :
                                            (
                                                typeof property === "string"
                                                    ?
                                                    `"${obj[propertyName]}"`
                                                    :
                                                    (
                                                        typeof property === 'boolean'
                                                            ?
                                                            (
                                                                obj[propertyName] === true ? 'true' : 'false'
                                                            )
                                                            :
                                                            obj[propertyName]
                                                    )
                                            )
                                    }
                                </span>
                        }
                    </li>
                })
            }
            <li className="text-orange-600">{'}'}</li>
        </ul>
    }

    const nestedItem = {
        first: 'first',
        second: {
            first: 'first',
            second: {
                first: 'first',
                second: {
                    first: 'first'
                }
            }
        }
    }

    const dialog = <DialogContext.Provider
        value={{
            open,
            setOpen
        }}
    >
        <Dialog
            title='View record'
            content={getJsonHtml(entity, 1)}
            onClosed={() => setOpen(false)}
        />
    </DialogContext.Provider>

    return <>
        {dialog}
        <EntityAction
            icon={<DataObjectIcon
                className="border border-slate-400 rounded-md w-8 h-8 p-1 group-hover:bg-gray-300 group-hover:fill-blue-600"
            />}
            asMenuItem={menuForActions}
            title={app.t("View record")}
            click={() => setOpen(!open)}
        />
    </>
}

export default ViewRecordAction;