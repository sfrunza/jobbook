import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import DeleteDialog from './DeleteDialog';
import EditDialog from './EditDialog';
import ImagesGallery from '../ImagesGallery';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function JobTableRow(props) {
  const { job, userId } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell sx={{ borderBottom: 'none' }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <StyledBadge badgeContent={job?.total_images || 0} color="primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width={20}
              >
                <path
                  fillRule="evenodd"
                  d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909.47.47a.75.75 0 11-1.06 1.06L6.53 8.091a.75.75 0 00-1.06 0l-2.97 2.97zM12 7a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                />
              </svg>
            </StyledBadge>
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="job" sx={{ borderBottom: 'none' }}>
          {job.user.username}
        </TableCell>
        <TableCell component="th" scope="job" sx={{ borderBottom: 'none' }}>
          {moment(job.date).format('ddd, MMM DD')}
        </TableCell>
        <TableCell
          align="center"
          sx={{ borderBottom: 'none', fontWeight: 'bold' }}
        >
          {job.job_id}
        </TableCell>
        <TableCell align="center" sx={{ borderBottom: 'none' }}>
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
        <TableCell align="center" sx={{ borderBottom: 'none' }}>
          {job.tips}
        </TableCell>
        <TableCell align="center" sx={{ borderBottom: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 160,
            }}
          >
            {job.teammates.map((u, i) => (
              <Typography key={i} sx={{ fontSize: 10 }}>
                {u}
                {i === job.teammates.length - 1 ? null : ','}
              </Typography>
            ))}
          </Box>
        </TableCell>
        <TableCell align="center" sx={{ borderBottom: 'none' }}>
          {job.comments}
        </TableCell>
        <TableCell align="center" sx={{ borderBottom: 'none' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <EditDialog job={job} userId={userId} />
            <DeleteDialog jobId={job.id} userId={userId} />
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ImagesGallery jobId={job.id} userId={userId} />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
