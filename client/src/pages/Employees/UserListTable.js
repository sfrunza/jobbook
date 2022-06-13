import React from 'react';
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
  Avatar,
} from '@mui/material';
import DeleteDialog from './DeleteDialog';
import { Link } from 'react-router-dom';

const UserListTable = (props) => {
  const { users, currentTab } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'text.secondary' }}>Name</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Phone</TableCell>
            <TableCell sx={{ color: 'text.secondary' }}>Role</TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => {
            return (
              <TableRow hover key={user.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box mr={2}>
                      <Avatar />
                    </Box>
                    <Box flexDirection="column">
                      <Link to={`/dashboard/employees/${user.id}`}>
                        <Typography fontWeight={600}>
                          {user.first_name + ' ' + user.last_name} (
                          {user.username})
                        </Typography>
                      </Link>
                      <Typography color={'text.secondary'} variant={'caption'}>
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  {user.role &&
                    user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </TableCell>
                <TableCell align="right">
                  <DeleteDialog user={user} currentTab={currentTab} />
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
