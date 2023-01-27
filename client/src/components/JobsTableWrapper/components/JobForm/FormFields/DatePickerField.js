import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import Box from '@mui/material/Box';

const StyledTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function DatePickerField(props) {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && Boolean(error);
  const { value } = field;
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const { label, ...rest } = props;

  // useEffect(() => {
  //   if (value) {
  //     const date = new Date(value);
  //     setSelectedDate(date);
  //   }
  // }, [value]);

  function _onChange(date) {
    const newDate = new Date(date);
    setValue(moment(newDate).format('YYYY-MM-DD'));
  }

  return (
    <div>
      <Box
        component="label"
        htmlFor="date"
        sx={{ fontSize: 14, fontWeight: 500 }}
      >
        Date
      </Box>
      <DesktopDatePicker
        {...field}
        {...rest}
        name="date"
        value={value || ''}
        format="yyyy-mm-dd"
        onChange={_onChange}
        InputAdornmentProps={{
          position: 'end',
          variant: 'standard',
          size: 'large',
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            error={isError}
            fullWidth
            size="small"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </div>
  );
}
