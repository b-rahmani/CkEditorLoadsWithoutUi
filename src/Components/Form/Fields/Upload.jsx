import {
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { useDropzone } from 'react-dropzone'
import Fade from '@mui/material/Fade'
import app from 'App'
import { download } from 'App'
import { FormContext } from 'Contexts'
import { useField } from 'Hooks'
import Field from './Field'
import Progress from '../../Progress'

const Upload = ({
    inForm,
    initialUrls,
    multiple,
    ...rest
}) => {
    const field = useField({
        column: 'Image',
        type: 'Upload',        
        ...rest
    })
    const {
        progress,
        validateAll,
    } = field
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [hasImages, setHasImages] = useState(false)
    var { setHasFile } = useContext(FormContext) || { setHasFile: () => { } }
    const [fieldProgress, setFieldProgress] = useState()

    const fieldStyles = "field mt-4 "

    useEffect(() => {
        setHasFile(true)
    }, [])

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    useEffect(() => {
        app.selectedFiles = files
        setPreviews(files.map(file => {
            return {
                name: file.name,
                url: URL.createObjectURL(file)
            }
        }))
        return () => previews.map(preview => URL.revokeObjectURL(preview.url))
    }, [files])

    useEffect(() => {
        setHasImages(previews.length > 0)
        validateAll()
    }, [previews])

    const removeImage = (e, preview) => {
        setFiles(files.filter(i => i.name != preview.name))
        e.stopPropagation()
    }

    const loadBlobs = async (url) => {
        for (var i = 0; i < initialUrls.length; i++) {
            const index = i
            download(`${initialUrls[i]}`)
                .then(file => {
                    setFiles([...files, file])
                    if (index === initialUrls.length - 1) {
                        setFieldProgress(false)
                    }
                }, e => {
                    console.log(e)
                })
        }
    }

    useEffect(() => {
        if (initialUrls?.length > 0) {
            setFieldProgress(true)
            loadBlobs()
        }
    }, [])

    const validate = () => {
        if (hasImages) {
            return true
        }
        return {
            error: 'required',
            message: 'Please upload an image'
        }
    }

    return <Field
        validate={validate}
        {...rest}
        {...field}
        className="relative w-full"
    >
        <div
            className={fieldStyles + (previews.length === 0 ? " relative bg-slate-100 flex justify-center items-center py-20 cursor-pointer group hover:bg-slate-200 border-dashed border-2 border-slate-400 hover:border-slate-600 dark:bg-zinc-700 " : "")}
            {...getRootProps()}
        >
            <Fade in={hasImages}>
                <div className="relative flex items-center justify-around">
                    {
                        previews.map(preview => <div className="relative" key={preview.url}>
                            <img
                                className="rounded-lg shadow-md shadow-black w-36 h-36 object-cover "
                                src={preview.url}
                            />
                            <IconButton
                                className="absolute -top-4 -right-4 "
                                onClick={(e) => removeImage(e, preview)}
                            >
                                <CancelIcon />
                            </IconButton>
                        </div>)
                    }
                </div>
            </Fade>
            <Fade in={!hasImages}>
                <div>
                    {
                        isDragActive && <div className="absolute inset-0 bg-green-500 animate-pulse"></div>
                    }
                    <input {...getInputProps({
                        multiple: multiple
                    })} />
                    <p className="relative text-sm tracking-wide font-bold text-slate-600 group-hover:drop-shadow group-hover:drop-shadow">
                        {
                            isDragActive ?
                                <span>{app.t(`Drop the ${multiple ? "files" : "file"} here ...`)}</span> :
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: app.t(`Drag &amp; drop ${multiple ? "some files" : "a file"} here, or click to select ${multiple ? "files" : "a file"}`)
                                    }}
                                />
                        }
                    </p>
                </div>
            </Fade>
        </div>
        {
            (progress || fieldProgress) && !inForm &&
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-800 opacity-30 ">
                <Progress />
            </div>
        }
    </Field>
}

export default Upload 
