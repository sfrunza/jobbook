import { useField } from 'formik';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import Box from '@mui/material/Box';
import { useSelector } from 'store';

const StyledTextField = styled((props) => <TextField {...props} />)(
  ({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function DatePickerField(props) {
  const { user } = useSelector((state) => state.auth);
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && Boolean(error);
  const { value } = field;
  const { label, ...rest } = props;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  function _onChange(date) {
    const newDate = new Date(date);
    setValue(moment(newDate).format('YYYY-MM-DD'));
  }

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
        // disablePast={!user?.admin}
        minDate={user?.admin ? '' : yesterday.toDateString()}
        name="date"
        value={value || ''}
        format="yyyy-mm-dd"
        onChange={_onChange}
        InputAdornmentProps={{
          position: 'end',
          variant: 'standard',
          size: 'large',
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            error={isError}
            fullWidth
            size="small"
            inputProps={{
              ...params.inputProps,
            }}
          />
        )}
      />
    </div>
  );
}
