import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { styled } from '@mui/material/styles';
import { DesktopDatePicker } from '@mui/lab';

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
  const [selectedDate, setSelectedDate] = useState(null);
  const { label = null, ...rest } = props;

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  function _onChange(date) {
    if (date) {
      setSelectedDate(date);
      try {
        const ISODateString = date.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  }

  return (
    <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Grid item xs={12}>
        <DesktopDatePicker
          {...field}
          {...rest}
          value={selectedDate}
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
              label={props.label}
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        {/* <MobileDatePicker
          {...field}
          {...rest}
          value={selectedDate}
          onChange={_onChange}
          renderInput={(params) => {
            return (
              <StyledTextField
                {...params}
                error={isError}
                fullWidth
                size="small"
                label={props.label}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            );
          }}
        /> */}
      </Grid>
    </Grid>
  );
}
