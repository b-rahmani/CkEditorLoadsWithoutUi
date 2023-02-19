import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import app from 'App'
import { get } from 'App'
import Select from './Select'
import Radio from './Radio'

const Enum = ({
    entityType,
    radio,
    ...rest
}) => {

    app.ensure([entityType])

    const [loading, setLoading] = useState()
    const [enumItems, setEnumItems] = useState(app.getEnum(entityType) || [])

    useEffect(() => {
        if (enumItems.length !== 0) {
            return
        }
        setLoading(true)
        get(`/${app.camelize(entityType)}/all`).then(data => {
            setEnumItems(data)
            app.setEnum(entityType, data)
            window.enums = app.getEnums()
            setLoading(false)
        }, error => {
            setLoading(false)
        })
    }, [entityType])

    return <div className="">
        {
            loading
                ?
                <CircularProgress />
                :
                radio
                    ?
                    <Radio
                        options={enumItems}
                        display={option => option.key}
                        choose={option => option.id}
                        {...rest}
                    />
                    :
                    <Select
                        {...rest}
                        options={enumItems}
                        display={option => option.key}
                        choose={option => option.id}
                    />
        }
    </div>
}

export default Enum 
