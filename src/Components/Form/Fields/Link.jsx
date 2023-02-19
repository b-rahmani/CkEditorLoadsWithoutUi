import LinkIcon from '@mui/icons-material/Link'
import Text from './Text'

const Link = (props) => {

    const validate = (url) => {
        if (!url) {
            return true
        }
        if (url.startsWith('/')) {
            return true
        }
        try {
            var temp = new URL(url)
            return true
        } catch (error) {
            // console.log(error)
            return {
                error: 'url',
                message: 'URL should start with / or be in the scheme:[//] format'
            }
        }
    }

    return <Text
        validate={validate}
        startIcon={LinkIcon}
        dir='ltr'
        label="Link"
        {...props}
    />
}

export default Link
