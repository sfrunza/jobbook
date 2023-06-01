import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import { styled } from '@mui/material/styles';
import JobTableRow from './JobTableRow';
import JobTableSkeleton from './JobTableSkeleton';
import { useSelector } from 'store';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function JobTable({
  jobs,
  isLoading,
  totalTips,
  totalHours,
  totalBoxes,
  totalJobs,
}) {
  const { user } = useSelector((state) => state.auth);
  const showForForeman = user?.role_names.includes('foreman');
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table sx={{ minWidth: 910 }} size="small">
        <TableHead>
          <TableRow>
            {showForForeman && <StyledTableCell />}
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center">Job ID</StyledTableCell>
            <StyledTableCell align="center">workT/extraT/minT</StyledTableCell>
            <StyledTableCell align="center">C/C Tips</StyledTableCell>
            {showForForeman && (
              <StyledTableCell align="center">TV Box</StyledTableCell>
            )}
            {showForForeman && (
              <StyledTableCell align="center">Teammates</StyledTableCell>
            )}
            {showForForeman && (
              <StyledTableCell align="center">Comments</StyledTableCell>
            )}
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && <JobTableSkeleton />}
          {jobs?.map((job) => (
            <JobTableRow
              key={job.id}
              job={job}
              userId={job.user.id}
              showForForeman={showForForeman}
            />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <StyledTableCell>Total</StyledTableCell>
            {showForForeman && <StyledTableCell />}
            <StyledTableCell align="center">{totalJobs}</StyledTableCell>
            <StyledTableCell align="center">{totalHours}</StyledTableCell>
            <StyledTableCell align="center">
              {totalTips?.toFixed(2)}
            </StyledTableCell>
            {showForForeman && (
              <StyledTableCell align="center">{totalBoxes}</StyledTableCell>
            )}
            {/* <StyledTableCell align="center" /> */}
            {showForForeman && <StyledTableCell align="center" />}
            {showForForeman && <StyledTableCell align="center" />}
            <StyledTableCell align="center" />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
