import { useContext } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import app from 'App'
import { filterOperator } from 'App'
import { useFilter } from 'Hooks'
import { useEnum } from 'Hooks'
import Filter from './Filter'
import Progress from '../../Progress'

const Enum = ({
    column,
    entityType,
    placeholder,
}) => {
    const {
        enumItems,
        progress,
    } = useEnum({ entityType })

    const {
        id,
        entity,
        label,
        setEntity,
    } = useFilter({
        choose: i => i,
        column,
        operator: filterOperator.equals,
        placeholder,
        show: i => i,
        type: 'select',
    })

    return <Filter
        id={id}
        label={label}
    >
        <Select
            size='small'
            value={entity || ''}
            label={app.t(label)}
            onChange={(event) => { setEntity(event.target.value) }}
        >
            {
                progress
                    ?
                    <Progress />
                    :
                    (
                        enumItems?.map(item =>
                            <MenuItem
                                key={item.id}
                                value={item.id}
                            >
                                {/* {app.t(item.titleizedKey)} */}
                                {app.t(item.key)}
                            </MenuItem>)
                    )
            }
        </Select>
    </Filter>
}

export default Enum 
