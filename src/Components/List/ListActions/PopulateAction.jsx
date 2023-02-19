import {
    useContext,
    useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation'
import app from 'App'
import { post } from 'App'
import {
    DialogContext,
    ListContext,
} from 'Contexts'
import ListAction from './ListAction'
import Radio from '../../Form/Fields/Radio'
import DialogForm from '../../Form/DialogForm'

const options = [
    {
        value: 1
    },
    {
        value: 10
    },
    {
        value: 100
    },
    {
        value: 1_000
    },
    {
        value: 10_000
    },
    {
        value: 100_000
    },
    {
        value: 1_000_000
    },
    {
        value: 10_000_000
    }
]

const inputs = <>
    <Radio
        className="flex flex-col md:flex-col items-start md:items-start"
        column='Count'
        options={options}
        display={entity => app.digitGroup(entity.value)}
        choose={entity => entity.value}
        required
    />
</>

const PopulateAction = () => {

    let [searchParams] = useSearchParams()

    const [open, setOpen] = useState(false)

    const {
        entityType,
        reload,
    } = useContext(ListContext)

    const insertData = ({
        currentEntity,
        data,
        error,
        setProgress,
        success,
    }) => {
        const { Count: count } = data
        const url = `/${app.camelize(entityType)}/insertFakeData?count=${count}&${searchParams}`
        setProgress(true)
        post(url)
            .then(data => {
                setProgress(false)
                setOpen(false)
                success('Fake data inserted')
                reload()
            }, e => {
                setProgress(false)
                error(e)
            })
    }

    return <DialogContext.Provider
        value={{
            open,
            setOpen
        }}
    >
        <div >
            <DialogForm
                tiny
                title={"Fake data insertion"}
                explanations="Due to duplicate records, a percentage of data might be inserted."
                inputs={inputs}
                okAction={insertData}
                okText="Insert"
            />
        </div>
        <div className=''>
            <ListAction
                title='Populate'
                icon={LocalGasStationIcon}
                click={() => setOpen(true)}
            />
        </div>
    </DialogContext.Provider>
}

export default PopulateAction
