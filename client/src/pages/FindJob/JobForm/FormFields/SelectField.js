import React from 'react';
import PropTypes from 'prop-types';
import { at } from 'lodash';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';
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

  return (
    <div>
      <Box
        component="label"
        htmlFor={field.name}
        sx={{ fontSize: 14, fontWeight: 500 }}
      >
        {label}
      </Box>
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
        {data.map((item, index) => (
          <option key={index} value={item} disabled={typeof item === 'string'}>
            {item}
          </option>
        ))}
      </StyledTextField>
    </div>
  );
}

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectField;
