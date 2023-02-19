import {
    useEffect,
    useState,
} from 'react'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import app from 'App'
import { get } from 'App'
import { useMessage } from 'Hooks'
import Progress from '../../Progress'

const Checks = ({
    column,
    itemsUrl,
    checkedItemsUrl,
    show,
    choose,
    itemKey,
    set
}) => {
    const [items, setItems] = useState(null)
    const [checkedItems, setCheckedItems] = useState(null)
    const [loading, setLoading] = useState(true)
    const [chosenValues, setChosenValues] = useState([])
    const { error } = useMessage()

    useEffect(() => {
        const onRunMethod = (entityGuid) => {
            if (entityGuid === itemKey) {
                loadItems()
                loadCheckedItems()
            }
        }
        // app.on(app.runMethod, onRunMethod)
    }, [])

    useEffect(() => {
        loadItems()
        loadCheckedItems()
    }, [])

    const loadItems = () => {
        setLoading(true)
        get(itemsUrl)
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data)
                }
                else {
                    if (data.data) {
                        setItems(data.data)
                    }
                    else {
                        throw new Error('Return value of the API is not well formatted')
                    }
                }
            }, e => {
                setLoading(false)
                error(e)
            })
    }

    const loadCheckedItems = () => {
        setLoading(true)
        get(checkedItemsUrl)
            .then(data => {
                if (Array.isArray(data)) {
                    setCheckedItems(data)
                }
                else {
                    if (data.data) {
                        setCheckedItems(data.data)
                    }
                    else {
                        throw new Error('Return value of the API is not well formatted')
                    }
                }
            }, e => {
                setLoading(false)
                error(e)
            })
    }

    useEffect(() => {
        if (items && items.map && checkedItems && checkedItems.map) {
            setLoading(false)
            for (var i = 0; i < checkedItems.length; i++) {
                for (var j = 0; j < items.length; j++) {
                    if (choose(checkedItems[i]) === choose(items[j])) {
                        chosenValues.push(choose(checkedItems[i]))
                        break
                    }
                }
            }
        }
    }, [items, checkedItems])

    const handleChange = (entity, isChecked) => {
        var chosenValue = choose(entity)
        if (isChecked) {
            if (chosenValues.indexOf(chosenValue) > -1) {

            }
            else {
                chosenValues.push(chosenValue)
            }
        }
        else {
            if (chosenValues.indexOf(chosenValue) > -1) {
                chosenValues.splice(chosenValues.indexOf(chosenValue), 1)
            }
        }
        setChosenValues([...chosenValues])
    }

    useEffect(() => {
        set([...new Set(chosenValues)])
    }, [chosenValues])

    return <div className={''}>
        {
            loading
                ?
                <Progress />
                :
                <div>
                    {
                        items && items.length > 0
                            ?
                            <FormGroup className="grid sm:grid-cols-2 lg:grid-cols-3">
                                {
                                    items.map(entity => <FormControlLabel
                                        className="select-none"
                                        key={entity.id}
                                        control={<Checkbox

                                        />}
                                        label={show(entity)}
                                        checked={chosenValues.indexOf(choose(entity)) > -1 || false}
                                        onChange={(e) => handleChange(entity, e.target.checked)}
                                    />)
                                }
                            </FormGroup>
                            :
                            <div>{app.t('No items found')}</div>
                    }
                </div>
        }
    </div>
}

export default Checks 
