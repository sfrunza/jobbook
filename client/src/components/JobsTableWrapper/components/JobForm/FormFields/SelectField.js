import { at } from 'lodash';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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
      <TextField
        {...rest}
        {...field}
        id={field.name}
        select
        fullWidth
        size="small"
        SelectProps={{
          native: true,
        }}
        value={selectedValue || ''}
        error={isError}
      >
        <option value={''}></option>
        {data.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </TextField>
    </div>
  );
}

export default SelectField;
