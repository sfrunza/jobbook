import React from 'react';
import Grid from '@mui/material/Grid';
import FormPage from './components/FormPage';
import JobList from './components/JobList/index';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import { Box, Button, Typography, Divider } from '@mui/material';
import moment from 'moment';
import useSWR, { mutate } from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Jobs = () => {
  const [monthYear, setMonthYear] = React.useState(
    moment().format('MMMM,YYYY')
  );

  const jobRef = React.useRef();

  const { data: jobs, error } = useSWR(
    `/api/v1/selected-month?&my=${monthYear}`,
    fetcher
  );
  const { data, error: jobsError } = useSWR('/api/v1/jobs', fetcher);

  const handleSelect = (e) => {
    e.preventDefault();
    setMonthYear(e.target.value);
    mutate(`/api/v1/selected-month?&my=${e.target.value}`);
    // jobRef.current.focus();
    jobRef.current.scrollIntoView();
  };

  return (
    <Fixed>
      <Container maxWidth="unset">
        <Box sx={{ mb: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h4" fontWeight={600}>
                Jobs
              </Typography>
            </Grid>
            {/* <Grid item>
              <Button
                disableElevation
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    width="22"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                }
                variant="contained"
              >
                Add
              </Button>
            </Grid> */}
          </Grid>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid item xs={12} md={4}>
            <FormPage monthYear={monthYear} />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: { xs: 'inline', md: 'none' }, mt: 4 }}
          >
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ mt: { xs: 4, md: 'unset' } }}
            ref={jobRef}
          >
            <div ref={jobRef}>
              <JobList
                monthYear={monthYear}
                handleSelect={handleSelect}
                jobs={jobs}
                data={data}
                error={error}
                jobsError={jobsError}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </Fixed>
  );
};

export default Jobs;
