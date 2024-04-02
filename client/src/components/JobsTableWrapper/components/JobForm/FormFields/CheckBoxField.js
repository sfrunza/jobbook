import { useField } from 'formik';
import Box from '@mui/material/Box';
import { Checkbox, FormControlLabel } from '@mui/material';
import { useSelector } from 'store';

export default function CheckBoxField(props) {
  const { extraTime } = useSelector((state) => state.settings);
  const { errorText, label, setFieldValue, ...rest } = props;
  const [field] = useField(props);

  const handleChnage = (e) => {
    const name = e.target.name;
    const value = e.target.checked;

    if (name === 'hasExtraTime') {
      setFieldValue('hasExtraTime', value);
      if (value) {
        setFieldValue('extraTime', extraTime);
      } else {
        setFieldValue('extraTime', null);
      }
    }
  };

  return (
    <FormControlLabel
      {...rest}
      {...field}
      onChange={handleChnage}
      checked={field.value}
      control={<Checkbox id={field.name} />}
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
