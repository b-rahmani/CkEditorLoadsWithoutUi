import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Tooltiper from './Tooltiper';
import { Link } from 'react-router-dom';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const TableOrder = (props) => {
    const { table, } = props;

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: "#f7f9fe",
            color: "#9298a8",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return <>
        <div className='hidden md:flex'>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 700 }}
                    aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {table.headers.map(item => <StyledTableCell
                                align="center"
                                key={item}
                            >
                                {item}
                            </StyledTableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.body.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell
                                    component="th"
                                    scope="row">
                                    <div className='flex  items-center gap-2'>
                                        <div className='rounded-3xl w-10 h-10'>
                                            <img
                                                src={row.image}
                                                alt="image"
                                                className='block object-cover'
                                            />
                                        </div>
                                        <div className='flex flex-col items-start justify-center gap-2'>
                                            <p>{row.name}</p>
                                            <p>{row.website}</p>
                                        </div>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.reportageNo}</StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                    className={`${row.status ? "text-green-400" : "text-red-400"}`}
                                >
                                    {row.status ? "published" : "not published"}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.releaseDate}</StyledTableCell>
                                <StyledTableCell align="center">{row.targetWeb}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <button
                                        className={`mx-auto group relative  ${row.reportageHealth?.status ? "flex" : "hidden"}`}
                                        onClick={() => dispatchModals({ type: modalsReducerType.healthReportage })}
                                    >
                                        <CheckCircleRoundedIcon className="w-6 h-6 fill-green-500" />
                                        <Tooltiper title={row.reportageHealth?.details} />
                                    </button>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className='flex  justify-center gap-2 items-center'>
                                        <button className='border border-slate-700 rounded-md outline-none text-sm px-2 py-1 text-slate-700 hover:bg-slate-200 relative group'>
                                            support
                                        </button>
                                        <Link
                                            to={row.link}
                                            className='border border-blue-400 rounded-md outline-none text-sm px-2 py-1 text-slate-700 hover:bg-slate-200 relative group'>
                                            <LinkRoundedIcon className="fill-blue-400" />
                                            <Tooltiper title="publish link" />
                                        </Link>
                                        <button className='border border-slate-700 rounded-md outline-none text-sm px-2 py-1 text-slate-700 hover:bg-slate-200 relative group'>
                                            <InfoOutlinedIcon />
                                            <Tooltiper title="more details" />
                                        </button>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        <StyledTableRow
                            key={"last"}
                            className="relative"
                        >
                            <StyledTableCell
                                align="right"
                                colSpan={10}
                            >
                                <Link
                                    to="/allrepo"
                                    className='flex  justify-center items-center gap-1 py-3'>
                                    <p className='text-blue-400 text-sm'>see all </p>
                                    <ArrowBackOutlinedIcon className="w-4 h-4 text-blue-500" />
                                </Link>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        {/* sm table  */}
        <div className='mx-2 md:hidden grid grid-cols-1 gap-1 '>
            {table.body.map((order, index) =>
                <div
                    className='flex justify-between items-center  p-4  border border-slate-400 rounded-md'
                    key={order.id}
                >
                    <div className='flex flex-col gap-3'>
                        {table.headers.map(head => <p
                            className='text-sm'
                            key={head}>
                            {head}
                        </p>)}
                    </div>
                    <div className="flex flex-col items-end grow gap-2">
                        <div className="flex justify-end gap-2 items-center">
                            <div className='rounded-3xl w-10 h-10'>
                                <img
                                    src={order.image}
                                    alt="image"
                                    className='block object-cover'
                                />
                            </div>
                            <div className='flex flex-col justify-between items-start'>
                                <p className='text-sm'>{order.name}</p>
                                <p className='text-sm'>{order.website}</p>
                            </div>
                        </div>
                        <p className='text-sm'>{order.reportageNo}</p>
                        <p className='text-sm'>{order.status ? "published" : "not published"}
                        </p>
                        <p className='text-sm'>{order.releaseDate}
                        </p>
                        <p className='text-sm'>{order.targetWeb}
                        </p>
                        <button
                            className={`px-2 group  ${order.reportageHealth?.status ? "flex" : "hidden"}`}
                            onClick={() => dispatchModals({ type: modalsReducerType.healthReportage })}
                        >
                            <CheckCircleRoundedIcon className="w-6 h-6 fill-green-500" />
                            <Tooltiper title={order.reportageHealth?.details} />
                        </button>
                        <div className='flex  justify-center gap-2 items-center'>
                            <button className='border border-slate-700 rounded-md outline-none text-sm px-2 py-1 text-slate-700 hover:bg-slate-200 relative group'>
                                support
                            </button>
                            <Link
                                to={order.link}
                                className='border border-blue-400 rounded-md outline-none text-sm px-2 py-1 text-slate-700 hover:bg-slate-200 relative group'>
                                <LinkRoundedIcon className="fill-blue-400" />
                                <Tooltiper title="publish link" />
                            </Link>
                            <button className='border border-slate-700 rounded-md outline-none text-sm px-2 py-1 text-slate-700 hover:bg-slate-200 relative group'>
                                <InfoOutlinedIcon />
                                <Tooltiper title="more details" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}
export default TableOrder;
