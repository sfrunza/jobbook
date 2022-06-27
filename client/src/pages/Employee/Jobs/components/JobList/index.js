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
import {
  TableFooter,
  TextField,
  MenuItem,
  Stack,
  Button,
  Typography,
} from '@mui/material';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import { DesktopDatePicker } from '@mui/x-date-pickers';

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
  handleStartChange,
  handleEndChange,
  handleFilter,
  start,
  end,
  dates,
}) {
  const months = data?.map((d) => moment(d.date).format('MMMM,YYYY'));
  const unique = months?.filter(onlyUnique);

  const totalHours = jobs?.reduce((accumulator, object) => {
    let extraTime = object.extra_hour ? 1 : 0;
    let minTime = object.min_time ? 5 : object.work_time;
    return accumulator + minTime + extraTime;
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
            size="small"
          >
            <MenuItem value={''}></MenuItem>
            {unique.map((option) => (
              <MenuItem key={option} value={option}>
                {option.split(',').join(' ')}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
      </Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ md: 'center', xs: 'start' }}
        mb={3}
      >
        <Box>
          <DesktopDatePicker
            label="From"
            value={start}
            onChange={handleStartChange}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </Box>
        <Box ml={3}>
          <DesktopDatePicker
            label="To"
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
        <Table sx={{ minWidth: 850 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Job ID</StyledTableCell>
              <StyledTableCell align="right">workT/extraT/minT</StyledTableCell>
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
                <StyledTableCell align="right">
                  <Typography
                    component={'span'}
                    color={job.work_time >= 5 ? 'primary' : 'textPrimary'}
                  >
                    {job.work_time}
                  </Typography>
                  /
                  <Typography
                    component={'span'}
                    color={job.work_time >= 5 ? 'primary' : 'textPrimary'}
                  >
                    {job.extra_hour ? '1' : '*'}
                  </Typography>
                  /
                  <Typography
                    component={'span'}
                    color={job.work_time < 5 ? 'primary' : 'textPrimary'}
                  >
                    {job.min_time ? '5' : '*'}
                  </Typography>
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
