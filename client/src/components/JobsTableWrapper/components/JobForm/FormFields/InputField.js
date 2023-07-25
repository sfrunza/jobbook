import React from 'react';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputField(props) {
  const { errorText, label, ...rest } = props;
  const [field, meta] = useField(props);

  return (
    <div>
      <Box
        component="label"
        htmlFor={field.name}
        sx={{ fontSize: 14, fontWeight: 500 }}
      >
        {label}
      </Box>
      <TextField
        name={field.name}
        id={field.name}
        size="small"
        type="text"
        value={field.value ? field.value : ''}
        multiline={field.name === 'comments'}
        rows={2}
        error={meta.touched && meta.error && true}
        {...field}
        {...rest}
      />
    </div>
  );
}
