import {
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import {
    Events,
    FileUploadWithPreview,
} from 'file-upload-with-preview'
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css'

const FileUpload = ({
    column,
    multiple,
    entityType,
}) => {

    const [id, setId] = useState(column)
    const [shouldRun, setShouldRun] = useState(true)

    useEffect(() => {
        setShouldRun(false)
    }, [id])

    useEffect(() => {
        if (!shouldRun) {
            const temp = new FileUploadWithPreview('fileUpload', {
                multiple: multiple,
            });
            window.addEventListener(Events.IMAGE_ADDED, (e) => {
                const { detail } = e;
                console.log('detail', detail);
            });
        }
    }, [shouldRun])

    return <div
        class="custom-file-container"
        data-upload-id='fileUpload'
    >

    </div>
}

export default FileUpload
