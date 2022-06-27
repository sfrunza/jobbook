import React from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import { Switch, Typography } from '@mui/material';
import { FileDownload } from '@mui/icons-material';

export default function RadioField(props) {
  const { errorText, label, ...rest } = props;
  const [field] = useField(props);

  return (
    <Box display={'flex'} alignItems={'center'} ml={1}>
      <Typography variant="body2" color={'text.secondary'}>
        {label}
      </Typography>
      <Switch
        {...rest}
        {...field}
        checked={field.value}
        inputProps={{ 'aria-label': 'controlled' }}
      />
    </Box>
  );
}
