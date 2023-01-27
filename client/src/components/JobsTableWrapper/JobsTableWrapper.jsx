import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import JobTable from './components/JobTable';
import SelectMonth from './components/SelectMonth';
import useSWR from 'swr';
import { format } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function JobsTableWrapper({ userId }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  const [startDate, setStartDate] = useState('');

  const { data, isLoading } = useSWR(
    start && end
      ? `/api/v1/users/${userId}/user_jobs?start=${start}&end=${end}`
      : null,
    fetcher
  );

  const jobs = data?.jobs;
  const totalTips = data?.total_tips;
  const totalHours = data?.total_hours;

  useEffect(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const formatStartDay = format(firstDay, 'yyyy-MM-dd');
    const formatEndDay = format(lastDay, 'yyyy-MM-dd');

    const formatStartDay2 = format(firstDay, 'MMM yyyy');

    if (!start && !end) {
      // setMonthYear(format(new Date(), 'MMM yyyy'));
      setSearchParams({
        start: formatStartDay,
        end: formatEndDay,
      });
      setStartDate(formatStartDay2);
    } else {
      const thisMonth = new Date(start);
      const thisMonthStart = new Date(
        thisMonth.getFullYear(),
        thisMonth.getMonth() + 1,
        1
      );
      const formatMonthStart = format(thisMonthStart, 'MMM yyyy');
      setStartDate(formatMonthStart);
    }
  }, [start, end]);

  const handleSelect = (e) => {
    const date = new Date(`01 ${e.target.value}`);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const formatStartDay = format(firstDay, 'yyyy-MM-dd');
    const formatEndDay = format(lastDay, 'yyyy-MM-dd');
    setSearchParams({
      start: formatStartDay,
      end: formatEndDay,
    });
  };

  const handleFilter = (start, end) => {
    setSearchParams({
      start: start,
      end: end,
    });
  };

  return (
    <Card sx={{ p: 2 }}>
      <SelectMonth
        handleSelect={handleSelect}
        handleFilter={handleFilter}
        userId={userId}
        startDate={startDate}
      />
      <JobTable
        jobs={jobs}
        isLoading={isLoading}
        totalTips={totalTips}
        totalHours={totalHours}
        userId={userId}
      />
    </Card>
  );
}
