import Field from './Field'
import RteConfig from './RteConfig';
import Control from './Control'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { useField } from 'Hooks'
import { CKEditor } from '@ckeditor/ckeditor5-react';

const HtmlRte = ({ ...rest }) => {

    // const field = useField({
    //     type: Rte.name,
    //     ...rest
    // })
    // const {
    //     displayValue,
    //     setDisplayValue,
    //     setChosenValue,
    //     label,
    //     progress,
    //     isValid,
    // } = field;

    return (
        <Field
            {...rest}
        // {...field}
        >
            <Control className=" px-0 py-0 border-none">
                <span>CK EDITOR </span>
                <CKEditor
                    editor={ClassicEditor}
                    // config={RteConfig}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={(editor) => {
                        console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                    }}
                />
            </Control>
        </Field>
    )
}

export default HtmlRte

// [&>.ck-editor]:w-full
