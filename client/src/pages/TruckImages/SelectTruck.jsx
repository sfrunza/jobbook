import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import useSWR from 'swr';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSearchParams } from 'react-router-dom';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SelectTruck({ handleSelect, handleFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useSWR('/api/v1/trucks', fetcher);

  const [value, setValue] = useState(searchParams.get('truck') || '');
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const filter = () => {
    handleFilter(start, end);
  };

  return (
    <>
      <Stack mb={2} spacing={1} direction="row" justifyContent="space-between">
        <Box flex={{ xs: '1 1 50%', sm: 'unset' }}>
          {isLoading && (
            <Skeleton variant="rounded" width={104.5} height={40} />
          )}
          {data && (
            <TextField
              select
              size="small"
              value={value}
              SelectProps={{
                native: true,
              }}
              onChange={(e) => {
                setValue(e.target.value);
                handleSelect(e);
              }}
            >
              <option value={'all'}>All</option>
              {data.map((truck) => (
                <option key={truck.id} value={truck.id}>
                  {truck.name}
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
                let formattedDate = moment(new Date(d)).format('YYYY-MM-DD');
                setStart(formattedDate);
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </div>
          <div>
            <DesktopDatePicker
              label="To"
              value={end}
              onChange={(d) => {
                let formattedDate = moment(new Date(d)).format('YYYY-MM-DD');
                setEnd(formattedDate);
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
              shouldDisableDate={(date) => {
                return moment(date).isBefore(start);
              }}
            />
          </div>
          <Stack direction="row" gap={1}>
            <Button
              onClick={filter}
              variant="contained"
              disableElevation
              disabled={!start || !end}
              fullWidth
            >
              filter
            </Button>
            <Button
              onClick={() => {
                setValue('all');
                setStart(null);
                setEnd(null);
                setSearchParams({
                  truck: 'all',
                });
              }}
              variant="outlined"
              disableElevation
              fullWidth
              color="inherit"
            >
              reset
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Divider sx={{ width: '100%', mb: 2 }} />
    </>
  );
}
