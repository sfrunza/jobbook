import React from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, Switch, Typography } from '@mui/material';
import { FileDownload } from '@mui/icons-material';

export default function CheckBoxField(props) {
  const { errorText, label, ...rest } = props;
  const [field] = useField(props);

  return (
    <FormControlLabel
      {...rest}
      {...field}
      checked={field.value}
      control={<Checkbox />}
      label={
        <Box
          component="label"
          htmlFor={field.name}
          sx={{ fontSize: 14, fontWeight: 500 }}
        >
          {label}
        </Box>
      }
      labelPlacement="start"
      sx={{ m: 0 }}
    />
  );
}
