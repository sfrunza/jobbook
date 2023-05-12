import React from 'react';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import { MonthCalendar } from '@mui/x-date-pickers/MonthCalendar';
import Stack from '@mui/material/Stack';
import moment from 'moment';

export default function SelectDate({ month, handleSelect }) {
  const now = moment();
  return (
    <Stack justifyContent="center" alignItems="center">
      <YearCalendar
        value={month}
        maxDate={moment(now)}
        minDate={moment(now).subtract(2, 'year')}
        onChange={handleSelect}
      />
      <MonthCalendar
        value={month}
        onChange={handleSelect}
        monthsPerRow={4}
        disableFuture
      />
    </Stack>
  );
}
