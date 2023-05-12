import React from 'react';
import { useField } from 'formik';
import { IMaskInput } from 'react-imask';
import OutlinedInput from '@mui/material/OutlinedInput';

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
  const [field, meta] = useField(props);
  return (
    <>
      <OutlinedInput
        {...field}
        {...props}
        type="tel"
        error={Boolean(meta.touched && meta.error)}
        inputComponent={TextMaskCustom}
      />
    </>
  );
}
