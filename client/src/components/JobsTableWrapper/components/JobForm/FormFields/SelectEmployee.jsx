import Box from '@mui/material/Box';
import { useField } from 'formik';
import useSWR from 'swr';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { at } from 'lodash';

const StyledTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SelectEmployee(props) {
  const { label, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  const { data } = useSWR('/api/v1/available_users', fetcher);
  const users = data?.users;

  return (
    <div>
      <Box
        component="label"
        htmlFor={field.name}
        sx={{ fontSize: 14, fontWeight: 500 }}
      >
        {label}
      </Box>
      {/* <T
        {...field}
        {...rest}
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
      </T> */}
      <StyledTextField
        {...rest}
        {...field}
        select
        fullWidth
        size="small"
        SelectProps={{
          native: true,
        }}
        value={selectedValue}
        error={isError}
      >
        <option value={''}></option>
        {users?.map((user, index) => (
          <option key={index} value={user.id}>
            {user.username}
          </option>
        ))}
      </StyledTextField>
    </div>
  );
}
