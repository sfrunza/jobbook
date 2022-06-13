import React from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

function SelectField(props) {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, 'touched', 'error');
  const isError = touched && error && true;
  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Grid item xs={12}>
        <StyledTextField
          {...rest}
          {...field}
          label={label}
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
          {data.map((item, index) => (
            <option
              key={index}
              value={item}
              disabled={typeof item === 'string'}
            >
              {item}
            </option>
          ))}
        </StyledTextField>
      </Grid>
    </Grid>
  );
}

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectField;
