import React, { useState } from 'react';
import JobList from './components/JobList/index';
import moment from 'moment';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Jobs = ({ userId }) => {
  const [monthYear, setMonthYear] = useState(moment().format('MMMM,YYYY'));

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [dates, setDates] = useState(['', '']);

  const { data: jobs, error } = useSWR(
    `/api/v1/users/${userId}/user-jobs?&my=${monthYear}&start=${dates[0]}&end=${dates[1]}`,
    fetcher
  );
  const { data, error: jobsError } = useSWR(
    `/api/v1/users/${userId}/user-jobs?&my=&start=&end=`,
    fetcher
  );

  const handleStartChange = (newValue) => {
    let formattedDate = moment(newValue).format('YYYY-MM-DD');
    setStart(formattedDate);
  };
  const handleEndChange = (newValue) => {
    let formattedDate = moment(newValue).format('YYYY-MM-DD');
    setEnd(formattedDate);
  };

  const handleFilter = () => {
    setMonthYear('');
    setDates([start, end]);
  };

  const handleSelect = (e) => {
    setDates(['', '']);
    setStart(null);
    setEnd(null);
    setMonthYear(e.target.value);
  };

  return (
    <JobList
      monthYear={monthYear}
      handleSelect={handleSelect}
      jobs={jobs}
      data={data}
      error={error}
      jobsError={jobsError}
      handleStartChange={handleStartChange}
      handleEndChange={handleEndChange}
      handleFilter={handleFilter}
      start={start}
      end={end}
      dates={dates}
    />
  );
};

export default Jobs;
