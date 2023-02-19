import Text from "./Text"
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
const Key = () => {

    const keyFormat = /^[a-zA-Z0-9]*$/;

    return <Text
        column='Key'
        startIcon={VpnKeyOutlinedIcon}
        required="Key is not provided"
        regex={keyFormat}
        // helpText="helper text"
        regexError='Key format is not valid. Only alphanumeric characters are allowed.'
        dir='ltr'
    />
}

export default Key
