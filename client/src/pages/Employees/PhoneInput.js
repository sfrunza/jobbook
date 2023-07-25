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
      onChange={onChange}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

export default function PhoneInput(props) {
  const [field, meta] = useField(props);
  // console.log(field);
  return (
    <>
      <OutlinedInput
        {...field}
        {...props}
        value={field.value}
        type="tel"
        error={Boolean(meta.touched && meta.error)}
        inputComponent={TextMaskCustom}
      />
    </>
  );
}
