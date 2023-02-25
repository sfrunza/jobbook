import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
  Paper,
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
          {jobs?.map((j) => {
            return (
              <TableRow hover key={j.id}>
                <TableCell>
                  <Typography fontWeight="bold">{j?.job_id}</Typography>
                </TableCell>
                <TableCell>
                  {moment(j.date).format('ddd, MMM DD YYYY')}
                </TableCell>
                <TableCell>
                  {j?.user?.username} ({j?.user?.role})
                </TableCell>
                <TableCell>
                  <Typography
                    component={'span'}
                    color={!j.min_time ? 'primary' : 'textPrimary'}
                  >
                    {j.work_time}
                  </Typography>
                  /
                  <Typography
                    component={'span'}
                    color={j.extra_hour ? 'primary' : 'textPrimary'}
                  >
                    {j.extra_hour ? '1' : '*'}
                  </Typography>
                  /
                  <Typography
                    component={'span'}
                    color={j.min_time ? 'primary' : 'textPrimary'}
                  >
                    {j.min_time ? '5' : '*'}
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
