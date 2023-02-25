import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  Avatar,
} from '@mui/material';
import DeleteDialog from './DeleteDialog';
import { Link } from 'react-router-dom';
import { useSelector } from 'store';
import Box from '@mui/material/Box';

const UserListTable = (props) => {
  const { users, currentTab } = props;
  const { user } = useSelector((state) => state.auth);

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary' }}>Name</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Phone</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Role</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Active</TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((u) => {
            return (
              <TableRow hover key={u.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box mr={2}>
                      <Avatar />
                    </Box>
                    <Box flexDirection="column">
                      <Link to={`/employees/${u.id}/general`}>
                        <Typography fontWeight={600}>
                          {u.id}. {u.first_name + ' ' + u.last_name} (
                          {u.username})
                        </Typography>
                      </Link>
                      <Typography color={'text.secondary'} variant={'caption'}>
                        {u.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>
                  {u.role && u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                </TableCell>
                <TableCell>
                  {u.active ? (
                    <Box
                      sx={{
                        color: 'success.main',
                        borderRadius: 2,
                        border: '1px solid',
                        paddingX: 1,
                        width: 'fit-content',
                      }}
                    >
                      Active
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        color: 'error.main',
                        borderRadius: 2,
                        border: '1px solid',
                        paddingX: 1,
                        width: 'fit-content',
                      }}
                    >
                      Not Active
                    </Box>
                  )}
                  {/* {u.active ? 'Active' : 'Not Active'} */}
                </TableCell>
                <TableCell align="right">
                  {u.id !== user.id && (
                    <DeleteDialog user={u} currentTab={currentTab} />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;
