import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Button from '@mui/material/Button';

export default function SelectRange({ handleFilter, handleResetFilter }) {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleReset = () => {
    setStart(null);
    setEnd(null);
    handleResetFilter();
  };

  const submit = () => {
    handleFilter(start, end);
  };

  return (
    <Stack gap={2} maxWidth={270} margin="auto" sx={{ marginTop: 3 }}>
      <DesktopDatePicker
        label="From"
        value={start}
        onChange={(d) => setStart(d)}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            readOnly: true,
          },
        }}
      />
      <DesktopDatePicker
        label="To"
        value={end}
        onChange={(d) => setEnd(d)}
        slotProps={{
          textField: {
            size: 'small',
            fullWidth: true,
            readOnly: true,
          },
        }}
      />
      <Stack direction="row" gap={2}>
        <Button
          onClick={() => handleReset()}
          color="inherit"
          variant="contained"
          disableElevation
          fullWidth
          disabled={!start || !end}
        >
          reset
        </Button>

        <Button
          onClick={submit}
          variant="contained"
          disableElevation
          fullWidth
          disabled={!start || !end}
        >
          filter
        </Button>
      </Stack>
    </Stack>
  );
}
