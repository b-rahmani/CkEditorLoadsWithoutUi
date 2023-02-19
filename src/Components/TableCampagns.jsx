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

const TableCampaigns = (props) => {
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
        <div className='hidden md:flex w-full'>
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 700 }}
                    aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {table.headers.map(item => <StyledTableCell
                                align="left"
                                key={item} >
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
                                        {row.reportageNo}
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Link
                                        to={row.link}
                                        className="text-sm">
                                        {row.name}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.createDate}</StyledTableCell>
                                <StyledTableCell align="left">{row.type}</StyledTableCell>
                                <StyledTableCell align="left">{row.releaseDate}</StyledTableCell>
                                <StyledTableCell
                                    align="left"
                                    className={`${row.status ? "text-green-400" : "text-red-400"}`}
                                >
                                    {row.status ? "finished" : "unknown"}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Link
                                        to={row.link}
                                        className={`border border-blue-400 rounded-md outline-none text-sm px-2 py-1 text-slate-700 hover:bg-slate-200  `}>
                                        مشاهده
                                    </Link>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        {/* sm table  */}
        <div className='mx-2 md:hidden grid grid-cols-1 gap-1 w-full'>
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
                    <div className="flex flex-col items-end grow gap-3">
                        <p className='text-sm'>{order.reportageNo}</p>
                        <Link
                            to={order.link}
                            className="text-sm">
                            {order.name}
                        </Link>
                        <p className='text-sm'>{order.createDate}
                        </p>
                        <p className='text-sm'>{order.type}
                        </p>
                        <p className='text-sm'>{order.releaseDate}
                        </p>
                        <p className='text-sm'>{order.status ? "finished" : "unknown"}
                        </p>
                        <div className='flex  justify-center gap-2 items-center'>
                            <Link
                                to={order.link}
                                className={`border border-blue-400 rounded-md outline-none text-sm px-2 py-1 text-slate-700 hover:bg-slate-200  `}>
                                مشاهده
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </>
}
export default TableCampaigns;
