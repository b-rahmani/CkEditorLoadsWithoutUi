import Text from "./Text"

const Title = ({ optional }) => {
    const props = {}
    if (!optional) {
        props.required = 'Please provide the title'
    }
    return <Text
        column='Title'
        {...props}
    />
}

export default Title
