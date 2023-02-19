import { useContext } from 'react'
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { FormContext } from 'Contexts'

const Actions = ({
    actions,
    className,
    handleSubmit,
    onCanceled
}) => {

    const {
        contentProgress,
        externalProgress,
        isValid,
        progress,
    } = useContext(FormContext)

    return <div id='actions' className={'mt-12 ' + className}>
        {
            actions ||
            <div className="ltr:mr-4 rtl:ml-4 mb-4" >
                {
                    progress
                        ?
                        <CircularProgress size={30} />
                        :
                        <div className='flex gap-4 justify-center'>
                            <Button
                                tabIndex={-1}
                                className="flex items-center justify-center rounded-lg shadow-lg"
                                variant="outlined"
                                onClick={() => {
                                    if (onCanceled instanceof Function) {
                                        onCanceled()
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                className={'ltr:ml-2 rtl:mr-2 border-none  flex items-center justify-center rounded-lg shadow-lg dark:text-white' + ((isValid && !externalProgress && !contentProgress) ? "  text-white  " : "")}
                                onClick={(e) => handleSubmit(e)}
                                disabled={!isValid || externalProgress || contentProgress}
                            >
                                Save
                            </Button>
                        </div>
                }
            </div>
        }
    </div>
}

export default Actions
