import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }
  return (
    <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      {/* <Grid item xs={12} md={4}>
        <Typography
          variant={'subtitle1'}
          fontWeight={600}
          gutterBottom
          htmlFor={props.field}
        >
          {props.label}
        </Typography>
      </Grid> */}
      <Grid item xs={12}>
        <StyledTextField
          {...field}
          {...rest}
          size="small"
          type="text"
          multiline={field.name === 'comments'}
          rows={4}
          error={meta.touched && meta.error && true}
          // helperText={_renderHelperText()}
        />
      </Grid>
    </Grid>
  );
}
