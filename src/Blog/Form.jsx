import {
    HtmlRte,
    PageForm,
    Rte,
} from 'Form'

const inputs = <>
    <HtmlRte
        column='Html'
        label='Html'
        placeholder='Html'
        required='Error of requried!'
    />
</>
const PostHtmlForm = () => {

    return <PageForm
        entityType="PostHtml"
        inputs={inputs}
    />
}
export default PostHtmlForm
