import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import DeleteDialog from './DeleteDialog';
import ImagesGallery from '../../ImagesGallery';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function JobTableRow(props) {
  const { post } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell sx={{ borderBottom: 'none' }}>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            <StyledBadge badgeContent={post.total_photos} color="primary">
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
        <TableCell
          component="th"
          scope="post"
          sx={{ borderBottom: 'none', fontWeight: 'bold' }}
        >
          {moment(post.date).format('ddd, MMM DD')}
        </TableCell>
        <TableCell align="center" sx={{ borderBottom: 'none' }}>
          {post.truck.name}
        </TableCell>
        <TableCell align="center" sx={{ borderBottom: 'none' }}>
          {post.user.username}
        </TableCell>

        <TableCell align="center" sx={{ borderBottom: 'none' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
            <DeleteDialog postId={post.id} />
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ImagesGallery postId={post.id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
