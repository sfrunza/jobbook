import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useField } from 'formik';
import useSWR from 'swr';

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
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
  const { data, error } = useSWR('/api/v1/users', fetcher);
  const users = data?.users;

  return (
    <div>
      {data && (
        <FormControl {...rest}>
          <InputLabel id="team-chip-label">{props.label}</InputLabel>
          <Select
            {...field}
            {...rest}
            labelId="team-chip-label"
            id="multiple-chip"
            multiple
            // value={personName}
            // onChange={handleChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label={props.label}
                {...field}
                {...rest}
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {users.map((user, i) => (
              <MenuItem
                key={i}
                value={user.username}
                //   style={getStyles(user, personName, theme)}
              >
                {user.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
