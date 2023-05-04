import { useField } from 'formik';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel, Switch, Typography } from '@mui/material';

export default function CheckBoxField(props) {
  const { errorText, label, setFieldValue, ...rest } = props;
  const [field] = useField(props);

  const handleChnage = (e) => {
    const name = e.target.name;
    const value = e.target.checked;

    if (name === 'minTime') {
      setFieldValue('minTime', value);
      if (value) {
        setFieldValue('extraHour', false);
      }
    }
    if (name === 'extraHour') {
      setFieldValue('extraHour', value);
      if (value) {
        setFieldValue('minTime', false);
      }
    }
  };

  return (
    <FormControlLabel
      {...rest}
      {...field}
      onChange={handleChnage}
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
      labelPlacement="top"
      sx={{ m: 0 }}
    />
  );
}
