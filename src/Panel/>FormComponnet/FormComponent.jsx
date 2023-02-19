import {
    Key,
    LongText,
    PageForm,
    Slug,
    Text,
    HtmlRte,
} from 'Form'
const FormComponent = () => {

    const inputs = <>
        <Key />
        <Text
            column="Title"
            placehodler="Title"
            required="Title is not written"
        />
        <HtmlRte />
        <Slug />
        <LongText
            column="Description"
            placehodler="Description"
        />

    </>

    return (<PageForm
        entityType='Page'
        inputs={inputs}
    />
    )
}

export default FormComponent
