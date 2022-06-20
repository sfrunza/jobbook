import React, { useState } from 'react';
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
import { TableFooter, Button, TextField, Stack } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import useSWR, { mutate } from 'swr';
import Spinner from 'components/Spinner';

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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function JobList({ userId }) {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [dates, setDates] = useState(['', '']);
  const { data, error } = useSWR(
    `/api/v1/users/${userId}/user-jobs?&start=${dates[0]}&end=${dates[1]}`,
    fetcher
  );

  const handleStartChange = (newValue) => {
    let formattedDate = moment(newValue).format('YYYY-MM-DD');
    setStart(formattedDate);
  };
  const handleEndChange = (newValue) => {
    let formattedDate = moment(newValue).format('YYYY-MM-DD');
    setEnd(formattedDate);
  };

  const handleFilter = () => {
    setDates([start, end]);
  };

  const totalHours = data?.reduce((accumulator, object) => {
    return accumulator + object.work_time;
  }, 0);

  const totalTips = data?.reduce((accumulator, object) => {
    return accumulator + object.tips;
  }, 0);

  return (
    <React.Fragment>
      {error && (
        <Box display={'flex'} justifyContent="center">
          <div>failed to load</div>
        </Box>
      )}
      {!data && (
        <Box display={'flex'} justifyContent="center">
          <Spinner />
        </Box>
      )}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ md: 'center', xs: 'start' }}
        mb={3}
      >
        <Box>
          <DesktopDatePicker
            label="Start"
            value={start}
            onChange={handleStartChange}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Box>
        <Box ml={3}>
          <DesktopDatePicker
            label="End"
            value={end}
            onChange={handleEndChange}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Box>
        <Box ml={3}>
          <Button
            variant="outlined"
            onClick={handleFilter}
            disabled={start && end ? false : true}
          >
            Filter
          </Button>
        </Box>
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        {data && (
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
              {data.map((job, i) => (
                <StyledTableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {moment(job.date).format('ddd, MMM DD')}
                  </StyledTableCell>
                  <StyledTableCell align="right">{job.job_id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {job.work_time}
                  </StyledTableCell>
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
                  <StyledTableCell align="right">
                    {job.comments}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* <EditDialog job={job} />
                    <DeleteDialog id={job.id} /> */}
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
                  {totalTips.toFixed(2)}
                </StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
                <StyledTableCell align="right"></StyledTableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </TableContainer>
    </React.Fragment>
  );
}
