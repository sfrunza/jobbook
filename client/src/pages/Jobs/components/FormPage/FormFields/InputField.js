import React from 'react';
import { useField } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const StyledTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
      alignItems: 'baseline',
    },
  })
);

export default function InputField(props) {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
  return (
    <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Grid item xs={12}>
        <StyledTextField
          {...field}
          {...rest}
          size="small"
          type="text"
          multiline={field.name === 'comments'}
          rows={4}
          error={meta.touched && meta.error && true}
        />
      </Grid>
    </Grid>
  );
}
