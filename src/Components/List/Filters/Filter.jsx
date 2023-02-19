import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import app from 'App'
import Control from '../../Form/Fields/Control';

const Filter = ({
    children,
    id,
    label,
}) => {
    // console.log("child material", children)
    return <div className="filter w-full">
        <FormControl
            fullWidth
        >
            <InputLabel
                size='small'
                htmlFor={id}
                className="select-none"
            >
                {app.t(label)}
            </InputLabel>
            {children}
        </FormControl>
    </div>
}

export default Filter;
