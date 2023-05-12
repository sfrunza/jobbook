import useSWR from 'swr';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Spinner from 'components/Spinner';
import { Typography } from '@mui/material';
import moment from 'moment';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function UserList({ month }) {
  const { data, isLoading, error } = useSWR(
    `/api/v1/user_hours?month=${moment(month).format('YYYY-MM-01')}`,
    fetcher
  );

  const users = data?.users;
  return (
    <Box display="flex" flexDirection="column" gap={1} mt={4} paddingX={1}>
      {error && (
        <Box display={'flex'} justifyContent="center" p={2}>
          <div>failed to load</div>
        </Box>
      )}
      {isLoading && <Spinner withText />}
      {users &&
        users.map((user, i) => {
          return (
            <Box key={i}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography>
                  {user.first_name} {user.last_name}
                </Typography>
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
