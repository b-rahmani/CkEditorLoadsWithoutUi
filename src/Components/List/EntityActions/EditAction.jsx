import {
    useContext,
    useState,
} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import app from 'App'
import Unify from '../../Unify';
import EntityAction from './EntityAction';
import { useNavigate } from 'react-router-dom';
import { ListContext } from 'Contexts'
import { EntityContext } from 'Contexts'
import { DialogContext } from 'Contexts'

const EditAction = () => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const {
        create,
        edit,
        entityType,
        hasEdit,
        menuForActions,
        upsert,
    } = useContext(ListContext)
    const { entity } = useContext(EntityContext)

    const hasHooks = (component) => {
        if (!component) {
            return false
        }
        if (component.toString instanceof Function) {
            return /\buse[A-Z]/.test(component.toString())
        }
        return false
    }

    const manageEdition = (component) => {
        if (typeof component === 'string') {
            navigate(component);
        }
        else {
            if (component instanceof Function) {
                if (hasHooks(component)) {
                    setOpen(true)
                }
                else {
                    var result = component(entity);
                    if (typeof result === 'object') {
                        setOpen(true)
                    }
                    else if (typeof result === 'string') {
                        navigate(result);
                    }
                    else {
                        app.error('For edition, either provide a component, or a URL');
                    }
                }
            }
            else {
                setOpen(true)
            }
        }
    }

    const editAction = <EntityAction
        icon={<EditIcon
            className="border border-green-400 rounded-md w-8 h-8 p-1 group-hover:bg-gray-300 group-hover:fill-green-600"
        />}
        title={app.t("Edit")}
        asMenuItem={menuForActions}
        click={() => {
            if (edit) {
                if (edit instanceof Function) {
                    if (hasHooks(edit)) {
                        manageEdition(edit)
                    }
                    else {
                        manageEdition(edit({
                            entity,
                            query: app.parseQuery()
                        }))
                    }
                }
                else {
                    manageEdition(edit);
                }
            }
            else if (upsert) {
                manageEdition(upsert);
            }
            else if (hasEdit) {
                if (create) {
                    manageEdition(create);
                }
                else {
                    app.error('You specified hasEdit={true} but has not provided a creation component.');
                }
            }
        }}
    />

    const showEditAction = edit instanceof Function ? edit({ entity }) : true

    return <DialogContext.Provider
        value={{
            open,
            setOpen,
            entity,
        }}
    >
        {
            create && typeof create !== 'string' && typeof create !== 'function' &&
            <Unify
                component={create}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        {
            upsert && typeof upsert !== 'string' &&
            <Unify
                component={upsert}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        {
            edit && typeof edit !== 'string' && typeof edit !== 'function' &&
            <Unify
                component={edit instanceof Function ? edit({ entity }) : edit}
                isSuperAdmin={app.isSuperAdmin()}
                entityId={entity.id}
                entity={entity}
                isEdit
            />
        }
        {showEditAction && editAction}
    </DialogContext.Provider>
}

export default EditAction
