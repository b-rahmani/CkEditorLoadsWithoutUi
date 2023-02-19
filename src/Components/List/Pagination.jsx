import {
    useContext,
    useState,
} from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import LastPageIcon from '@mui/icons-material/LastPage'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PositiveInteger from '../Inputs/PositiveInteger'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import app from 'App'
import { ListContext } from 'Contexts'
import { DialogContext } from 'Contexts'
import Dialog from '../Dialog/Dialog'
import OkCancel from '../Dialog/OkCancel'

const textStyle = "text-blue-900 p-2 font-light text-xs items-center cursor-pointer uppercase hover:bg-blue-50 rounded-lg"

const Pagination = () => {

    const {
        metadata,
        setPageNumber,
        setPageSize,
    } = useContext(ListContext)

    const {
        from,
        to,
        pageNumber,
        pageSize,
        pagesCount,
        totalCount
    } = metadata

    const [pageNumberDialogIsOpen, setPageNumberDialogVisibility] = useState(false)
    const [pageSizeDialogIsOpen, setPageSizeDialogVisibility] = useState(false)
    const [internalPageSize, setInternalPageSize] = useState(pageSize)

    const goToPage = (number) => {
        if (number > pagesCount) {
            setPageNumber(pagesCount)
        }
        else {
            setPageNumber(number)
        }
        setPageNumberDialogVisibility(false)
    }

    const setSize = () => {
        setPageSize(internalPageSize)
        setPageNumber(1)
        setPageSizeDialogVisibility(false)
    }

    const pageNumberDialog = <Dialog
        tiny
        title='Go to page'
        onEntered={() => { document.querySelector('#goToPageInput').focus() }}
        content={<form
            noValidate
            onSubmit={() => { }}
        >
            <div id='fields'>
                <PositiveInteger
                    id='goToPageInput'
                    onEnter={(value) => {
                        if (value) {
                            goToPage(value)
                        }
                    }} />
            </div>
        </form>}
        actions={<OkCancel
            okText='Go'
            okClick={() => {
                var value = document.querySelector('#goToPageInput').value
                if (value) {
                    goToPage(value)
                }
            }}
            cancelClick={() => setPageNumberDialogVisibility(false)}
        />}
    />

    const pageSizeDialog = <Dialog
        tiny
        title='Select page size'
        onEntered={() => { /*document.querySelector('#pageSizeSelect').focus()*/ }}
        content={<FormControl fullWidth className="mt-4">
            <InputLabel>
                {app.t('Page size')}
            </InputLabel>
            <Select
                label={app.t('Page size')}
                value={internalPageSize}
                onChange={(e) => { setInternalPageSize(e.target.value) }}
            >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
        </FormControl>}
        actions={<OkCancel
            okText='Save'
            okClick={setSize}
            cancelClick={() => setPageSizeDialogVisibility(false)}
        />}
    />

    return <div
        id='pagination'
        className={
            "flex flex-col md:flex-row justify-between items-center w-full static"
        }
    >
        <DialogContext.Provider
            value={{
                open: pageNumberDialogIsOpen,
                setOpen: setPageNumberDialogVisibility
            }}
        >
            {pageNumberDialog}
        </DialogContext.Provider>
        <DialogContext.Provider
            value={{
                open: pageSizeDialogIsOpen,
                setOpen: setPageSizeDialogVisibility
            }}
        >
            {pageSizeDialog}
        </DialogContext.Provider>
        <Button
            id='goToPage'
            className={textStyle + " text-left hover:bg-zinc-400"}
            onClick={() => setPageNumberDialogVisibility(true)}
	>
            <Tooltip
                title={app.t('Click to go to a specific page')}
            >
                <span className="dark:text-white"> {app.t('Page')} #</span>
            </Tooltip>
        </Button>
        <div
            id='pageLinks'
            className={
                "flex-1 items-center flex justify-center gap-1 "
            }
        >
            <IconButton
                disabled={pageNumber === 1}
                onClick={() => goToPage(1)}
                className="bg-slate-100 p-1 rounded-md  hover:bg-slate-300"
            >
                <Tooltip title={app.t('First page')}>
                    {
                        app.isRtl()
                            ?
                            <LastPageIcon />
                            :
                            <FirstPageIcon />
                    }
                </Tooltip>
            </IconButton>
            <IconButton
                disabled={pageNumber === 1}
                onClick={() => goToPage(pageNumber - 1)}
                className="bg-slate-100 p-1 rounded-md  hover:bg-slate-300"
            >
                <Tooltip title={app.t('Previous page')}>
                    {
                        app.isRtl()
                            ?
                            <ChevronRightIcon />
                            :
                            <ChevronLeftIcon />
                    }
                </Tooltip>
            </IconButton>
            <span className="mx-4 dark:text-white">{app.digitGroup(pageNumber)}</span>
            <IconButton
                disabled={pageNumber >= pagesCount}
                onClick={() => goToPage(pageNumber + 1)}
                className="bg-slate-100 p-1 rounded-md  hover:bg-slate-300"
            >
                <Tooltip title={app.t('Next page')}>
                    {
                        app.isRtl()
                            ?
                            <ChevronLeftIcon />
                            :
                            <ChevronRightIcon />
                    }
                </Tooltip>
            </IconButton>
            <Tooltip title={app.t('Last page') + (pagesCount ? ` - ${app.digitGroup(pagesCount)}` : "")}>
                <span>
                    <IconButton
                        disabled={pageNumber >= pagesCount}
                        onClick={() => goToPage(pagesCount)}
                        className="bg-slate-100 p-1 rounded-md  hover:bg-slate-300"
                    >
                        {
                            app.isRtl()
                                ?
                                <FirstPageIcon />
                                :
                                <LastPageIcon />
                        }
                    </IconButton>
                </span>
            </Tooltip>
        </div>
        <Tooltip
            title={app.t('Click to change page size')}
        >
            <Button
                id='statsAndPageSize'
                className={textStyle + " text-right"}
                onClick={() => setPageSizeDialogVisibility(true)}>
                {
                    from
                        ?
                        <>
                            <span className="text-blue-900 dark:text-white">{app.digitGroup(from)}</span>
                            <span className="mx-2 dark:text-white">-</span>
                            <span className="text-blue-900 dark:text-white">{app.digitGroup(to)}</span>
                        </>
                        :
                        null
                }
                {
                    totalCount
                        ?
                        <>
                            <span className="mx-2 dark:text-white">/</span>
                            <span className="text-blue-900 dark:text-white">{app.digitGroup(totalCount)}</span>
                        </>
                        :
                        null
                }
            </Button>
        </Tooltip>
    </div>
}

export default Pagination
