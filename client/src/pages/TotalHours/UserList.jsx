import useSWR from 'swr';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Spinner from 'components/Spinner';
import { Button, Typography } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UserList({ month }) {
  const [sortType, setSortType] = useState('up');
  const { data, isLoading, error } = useSWR(
    `/api/v1/user_hours?month=${moment(month).format('YYYY-MM-01')}`,
    fetcher
  );

  const users = data?.users;
  const sortedUsers =
    sortType === 'up'
      ? users?.sort((a, b) => b.total_hours - a.total_hours)
      : users?.sort((a, b) => a.total_hours - b.total_hours);

  function sortUsers() {
    setSortType((prev) => (prev === 'up' ? 'down' : 'up'));
  }
  return (
    <Box display="flex" flexDirection="column" gap={1} mt={4}>
      {error && (
        <Box display={'flex'} justifyContent="center" p={2}>
          <div>failed to load</div>
        </Box>
      )}
      <Box sx={{ display: 'flex', flex: 1, justifyContent: 'end' }}>
        <Box component={Button} onClick={sortUsers}>
          {sortType === 'up' ? (
            <KeyboardArrowUpRounded />
          ) : (
            <KeyboardArrowDownRounded />
          )}
          <b>Hours</b>
        </Box>
      </Box>
      {isLoading && <Spinner withText />}
      {users &&
        sortedUsers.map((user, i) => {
          return (
            <Box key={i} paddingX={1}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Box
                  component={Link}
                  reloadDocument
                  to={`/employees/${user.id}/jobs`}
                  sx={{ '&:hover': { color: 'primary.main' } }}
                >
                  <Typography>
                    {user.first_name} {user.last_name}
                  </Typography>
                </Box>
                <Typography>
                  <b>{user.total_hours}</b>
                </Typography>
              </Box>
              {i < users?.length - 1 && <Divider />}
            </Box>
          );
        })}
    </Box>
  );
}
