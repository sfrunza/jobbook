import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Spinner from 'components/Spinner';
import { TableFooter, TextField, MenuItem } from '@mui/material';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.background.level2,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function JobList({
  monthYear,
  handleSelect,
  jobs,
  data,
  error,
  jobsError,
  ref,
}) {
  const months = data?.map((d) => moment(d.date).format('MMMM,YYYY'));
  const unique = months?.filter(onlyUnique);

  const totalHours = jobs?.reduce((accumulator, object) => {
    return accumulator + object.work_time;
  }, 0);

  const totalTips = jobs?.reduce((accumulator, object) => {
    return accumulator + object.tips;
  }, 0);

  return (
    <React.Fragment>
      <Box mb={3} width={175}>
        {data ? (
          <TextField
            select
            label="Month/Year"
            value={monthYear}
            onChange={handleSelect}
            fullWidth
          >
            {unique.map((option) => (
              <MenuItem key={option} value={option}>
                {option.split(',').join(' ')}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
      </Box>

      {/* {jobsError && (
        <Box display={'flex'} justifyContent="center">
          <div>failed to load</div>
        </Box>
      )}
      {!jobs && (
        <Box display={'flex'} justifyContent="center">
          <Spinner />
        </Box>
      )} */}
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Job ID</StyledTableCell>
              <StyledTableCell align="right">Hours</StyledTableCell>
              <StyledTableCell align="right">C/C Tips</StyledTableCell>
              <StyledTableCell align="right">Teammates</StyledTableCell>
              <StyledTableCell align="right">Comments</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs?.map((job, i) => (
              <StyledTableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {moment(job.date).format('ddd, MMM DD')}
                </StyledTableCell>
                <StyledTableCell align="right">{job.job_id}</StyledTableCell>
                <StyledTableCell align="right">{job.work_time}</StyledTableCell>
                <StyledTableCell align="right">{job.tips}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    justifyContent={'flex-end'}
                  >
                    {job.teammates.map((u, i) => (
                      <p key={i} style={{ fontSize: 12, marginRight: 4 }}>
                        {u}
                        {i === job.teammates.length - 1 ? null : ','}
                      </p>
                    ))}
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">{job.comments}</StyledTableCell>
                <StyledTableCell align="right">
                  <Box>
                    <Box mb={0.5}>
                      <EditDialog job={job} monthYear={monthYear} />
                    </Box>
                    <Box>
                      <DeleteDialog id={job.id} monthYear={monthYear} />
                    </Box>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">{totalHours}</StyledTableCell>
              <StyledTableCell align="right">
                {jobs && totalTips.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
