import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import moment from 'moment';

const JobListTable = (props) => {
  const { jobs } = props;

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary' }}>Job ID</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Date</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Employee</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>
              workT/extraT/minT
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs?.map((job) => {
            return (
              <TableRow hover key={job.id}>
                <TableCell>
                  <Typography fontWeight="bold">{job?.job_id}</Typography>
                </TableCell>
                <TableCell>
                  {moment(job.date).format('ddd, MMM DD YYYY')}
                </TableCell>
                <TableCell>
                  {job?.user?.username}
                  <Box gap={0.5} display="flex">
                    {job?.user?.role_names.map((r) => (
                      <Typography
                        color="text.secondary"
                        variant="caption"
                        key={r}
                      >
                        {r}
                      </Typography>
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobListTable;
