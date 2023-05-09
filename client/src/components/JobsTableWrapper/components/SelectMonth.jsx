import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import useSWR from 'swr';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SelectMonth({
  handleSelect,
  handleFilter,
  userId,
  startDate,
}) {
  const { data, isLoading } = useSWR(
    `/api/v1/users/${userId}/available_months`,
    fetcher
  );

  const [value, setValue] = useState(startDate);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const filter = () => {
    handleFilter(start, end);
    setValue('');
  };

  useEffect(() => {
    setValue(startDate);
  }, [startDate]);

  return (
    <>
      <Stack mb={2} spacing={1} direction="row" justifyContent="space-between">
        <Box flex={{ xs: '1 1 50%', sm: 'unset' }}>
          {isLoading && (
            <Skeleton variant="rounded" width={115.5} height={40} />
          )}
          {data?.months && startDate && (
            <TextField
              select
              size="small"
              value={value}
              SelectProps={{
                native: true,
              }}
              onChange={(e) => {
                setStart(null);
                setEnd(null);
                setValue(e.target.value);
                handleSelect(e);
              }}
            >
              <option value={''}>Select...</option>
              {data.months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          )}
        </Box>
        <Stack mb={2} spacing={2} direction={{ xs: 'column', md: 'row' }}>
          <div>
            <DesktopDatePicker
              label="From"
              value={start}
              onChange={(d) => {
                // let formattedDate = moment(new Date(d)).format('YYYY-MM-DD');
                setStart(d);
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                },
              }}
              // renderInput={(params) => <TextField {...params} size="small" />}
            />
          </div>
          <div>
            <DesktopDatePicker
              label="To"
              value={end}
              onChange={(d) => {
                // let formattedDate = moment(new Date(d)).format('YYYY-MM-DD');
                setEnd(d);
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  fullWidth: true,
                },
              }}
              // renderInput={(params) => <TextField {...params} size="small" />}
            />
          </div>
          <div>
            <Button
              onClick={filter}
              variant="contained"
              disableElevation
              fullWidth
              disabled={!start || !end}
            >
              filter
            </Button>
          </div>
        </Stack>
      </Stack>
      <Divider sx={{ width: '100%', mb: 2 }} />
    </>
  );
}
