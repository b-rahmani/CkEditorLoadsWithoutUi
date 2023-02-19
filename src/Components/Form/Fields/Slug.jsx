import Text from "./Text"
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
const Slug = () => {
    
    const slugFormat = /^[\w-]*$/;

    return <Text
        column='Slug'
        startIcon={InsertLinkOutlinedIcon}
        required="Slug is not provided"
        regex={slugFormat}
        regexError='Slug format is not valid. Only alphanumeric characters are allowed.'
        dir='ltr'
    />
}

export default Slug
