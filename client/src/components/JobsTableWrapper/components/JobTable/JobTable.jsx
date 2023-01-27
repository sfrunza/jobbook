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
import { Skeleton, TableFooter, Typography } from '@mui/material';
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

export default function JobTable({
  jobs,
  isLoading,
  totalTips,
  totalHours,
  userId,
}) {
  return (
    <React.Fragment>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Job ID</StyledTableCell>
              <StyledTableCell align="center">
                workT/extraT/minT
              </StyledTableCell>
              <StyledTableCell align="center">C/C Tips</StyledTableCell>
              <StyledTableCell align="center">Teammates</StyledTableCell>
              <StyledTableCell align="center">Comments</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <StyledTableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  <Skeleton variant="text" sx={{ fontSize: 45 }} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Skeleton variant="text" sx={{ fontSize: 45 }} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Skeleton variant="text" sx={{ fontSize: 45 }} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Skeleton variant="text" sx={{ fontSize: 45 }} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Skeleton variant="text" sx={{ fontSize: 45 }} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Skeleton variant="text" sx={{ fontSize: 45 }} />
                </StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
              </StyledTableRow>
            )}
            {jobs?.map((job, i) => (
              <StyledTableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {moment(job.date).format('ddd, MMM DD')}
                </StyledTableCell>
                <StyledTableCell align="center">{job.job_id}</StyledTableCell>
                <StyledTableCell align="center">
                  <Typography
                    component={'span'}
                    color={!job.min_time ? 'primary' : 'textPrimary'}
                  >
                    {job.work_time}
                  </Typography>
                  /
                  <Typography
                    component={'span'}
                    color={job.extra_hour ? 'primary' : 'textPrimary'}
                  >
                    {job.extra_hour ? '1' : '*'}
                  </Typography>
                  /
                  <Typography
                    component={'span'}
                    color={job.min_time ? 'primary' : 'textPrimary'}
                  >
                    {job.min_time ? '5' : '*'}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">{job.tips}</StyledTableCell>
                <StyledTableCell align="center">
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
                <StyledTableCell align="center">{job.comments}</StyledTableCell>
                <StyledTableCell align="center">
                  <Box>
                    <Box mb={0.5}>
                      <EditDialog job={job} userId={userId} />
                    </Box>
                    <Box>
                      <DeleteDialog jobId={job.id} userId={userId} />
                    </Box>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">{totalHours}</StyledTableCell>
              <StyledTableCell align="center">
                {totalTips?.toFixed(2)}
              </StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
