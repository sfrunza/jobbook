import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import JobTableRow from './JobTableRow';
import JobTableSkeleton from './JobTableSkeleton';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function JobTable({ posts, isLoading }) {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table sx={{ minWidth: 500 }} size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Truck</StyledTableCell>
            <StyledTableCell align="center">Author</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && <JobTableSkeleton />}
          {posts?.map((post) => (
            <JobTableRow key={post.id} post={post} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
