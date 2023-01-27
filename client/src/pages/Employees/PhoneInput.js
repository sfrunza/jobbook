import React from 'react';
import { at } from 'lodash';
import { useField } from 'formik';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { IMaskInput } from 'react-imask';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

const StyledOutlinedInput = styled((props) => <OutlinedInput {...props} />)(
  ({ theme }) => ({
    '& .MuiInputBase-root': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(#00) 000-0000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function PhoneInput(props) {
  const { errorText, label = null, placeholder, afterText, ...rest } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, 'touched', 'error');
    if (touched && error) {
      return error;
    }
  }

  return (
    <>
      <StyledOutlinedInput
        sx={{
          color: 'text.secondary',
          backgroundColor: 'background.paper',
        }}
        {...field}
        {...rest}
        size="small"
        type="text"
        placeholder={placeholder || props.label}
        error={meta.touched && meta.error && true}
        inputComponent={TextMaskCustom}
      />
      {_renderHelperText() && (
        <FormHelperText error>{_renderHelperText()}</FormHelperText>
      )}
    </>
  );
}
