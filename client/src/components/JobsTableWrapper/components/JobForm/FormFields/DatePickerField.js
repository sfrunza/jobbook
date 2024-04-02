import { useField } from 'formik';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import Box from '@mui/material/Box';
import { useSelector } from 'store';

export default function DatePickerField(props) {
  const { user } = useSelector((state) => state.auth);
  const [field, meta, helper] = useField(props);
  // const { touched, error } = meta;
  const { setValue } = helper;
  const { value } = field;
  const { label, ...rest } = props;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div>
      <Box
        component="label"
        htmlFor="date"
        sx={{ fontSize: 14, fontWeight: 500 }}
      >
        Date
      </Box>
      <DesktopDatePicker
        {...field}
        {...rest}
        minDate={user?.admin ? null : moment(yesterday)}
        name="date"
        id="date"
        value={value}
        onChange={(date) => setValue(date)}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            readOnly: true,
            id: 'date',
          },
        }}
      />
    </div>
  );
}
