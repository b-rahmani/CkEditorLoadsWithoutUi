import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import app from 'App'
import {
    DialogContext,
    ListContext,
} from 'Contexts'
import Unify from '../../Unify'

const AddAction = () => {

    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const {
        create,
        upsert,
        upsertionIcon,
        upsertionText,
    } = useContext(ListContext)

    window.create =create

    const icon = upsertionIcon
        ?
        <Icon icon={upsertionIcon} />
        :
        <AddIcon className="fill-white " />

    return <DialogContext.Provider
        value={{
            open,
            setOpen
        }}
    >
        <div>
            {
                create && typeof create !== 'string' && typeof create !== 'function' &&
                <Unify
                    component={create}
                />
            }
            {
                upsert && typeof upsert !== 'string' &&
                <Unify
                    component={upsert}
                />
            }
            {
                create || upsert
                    ?
                    <Button
                        className="p-2 flex items-center gap-2 justify-center bg-green-500 hover:bg-green-600 rounded-md group relative"
                        variant="outlined"
                        startIcon={icon}
                        onClick={() => {
                            if (typeof create === 'string') {
                                navigate(create)
                            }
                            else if (create instanceof Function) {
                                var props = {
                                    query: app.parseQuery()
                                }
                                var result = create(props)
                                navigate(result)
                            }
                            else {
                                setOpen(true)
                            }
                        }}
                    >
                        <span className="text-white text-sm">
                            {
                                (upsertionText)
                                    ?
                                    app.t(upsertionText)
                                    :
                                    app.t("Create")
                            }
                        </span>
                    </Button>
                    :
                    null
            }
        </div>
    </DialogContext.Provider>
}

export default AddAction

/*
<button onClick={() => dispatchModals({ type: modalsReducerType.ticketToggle })} className="p-2 flex items-center gap-2 justify-center bg-green-500 hover:bg-green-600 rounded-md group relative">
              <PlusIcon className="fill-white w-4 h-4" />
              <p className='text-white text-sm'>new ticket</p>
            </button>
*/
