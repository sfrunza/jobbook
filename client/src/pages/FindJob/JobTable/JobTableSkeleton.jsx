import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Skeleton from '@mui/material/Skeleton';

export default function JobTableSkeleton() {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Skeleton variant="text" sx={{ fontSize: 21 }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={{ fontSize: 21 }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={{ fontSize: 21 }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={{ fontSize: 21 }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={{ fontSize: 21 }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={{ fontSize: 21 }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={{ fontSize: 21 }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={{ fontSize: 21 }} />
      </TableCell>
      <TableCell align="center"></TableCell>
    </TableRow>
  );
}
