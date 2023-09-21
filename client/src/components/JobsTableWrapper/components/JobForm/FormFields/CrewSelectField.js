import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useField } from 'formik';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function CrewSelectField(props) {
  const { errorText, label, name, ...rest } = props;
  const [field] = useField(props);
  const { data, isLoading } = useSWR('/api/v1/available_users', fetcher);
  const users = data?.users;

  return (
    <div>
      <Box sx={{ fontSize: 14, fontWeight: 500 }}>{label}</Box>
      {isLoading ? (
        <Skeleton variant="rounded" width={'100%'} height={40} />
      ) : (
        <Select
          multiple
          input={<OutlinedInput size="small" {...field} {...rest} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {users?.map((user, i) => (
            <MenuItem key={i} value={user.username}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
}
