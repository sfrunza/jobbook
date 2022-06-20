import Container from 'components/Container';
import Fixed from 'layouts/Fixed';
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import { Box, Grid, Typography, Divider, Button } from '@mui/material';
import Spinner from 'components/Spinner';
import JobList from './JobList';
import CustomTabs from './CustomTabs';
import General from './General';
import moment from 'moment';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ marginTop: 16 }}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Employee = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const id = Number(params.id);

  const { data: user, error: userError } = useSWR(
    `/api/v1/users/${id}`,
    fetcher
  );
  // const { data: jobs, error: jobsError } = useSWR(
  //   `/api/v1/users/${id}/user-jobs?&start=&end=`,
  //   fetcher
  // );

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const handleStartChange = (newValue) => {
  //   let formattedDate = moment(newValue).format('YYYY-MM-DD');
  //   setStart(formattedDate);
  // };
  // const handleEndChange = (newValue) => {
  //   let formattedDate = moment(newValue).format('YYYY-MM-DD');
  //   setEnd(formattedDate);
  // };

  // const handleFilter = () => {
  //   fetch(`/api/v1/users/${id}/user-jobs?&start=${start}&end=${end}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       mutate(`/api/v1/users/${id}/user-jobs?&start=${start}&end=${end}`);
  //     })
  //     .catch((err) => console.log(err));
  //   console.log(start, end);
  //   mutate(`/api/v1/users/${id}/user-jobs?&start=${start}&end=${end}`);
  // };

  // console.log(jobs);

  return (
    <Fixed>
      <Container maxWidth="unset">
        <Box sx={{ position: 'relative', top: '-16px' }}>
          <Button
            onClick={() => navigate(-1)}
            color="inherit"
            startIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                width="20"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            }
          >
            back
          </Button>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h5" fontWeight={600}>
                {user && user.first_name + ' ' + user.last_name}
              </Typography>
            </Grid>
            <Grid item>{/* <NewUserDialog /> */}</Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <CustomTabs value={value} handleChange={handleChange} />
        {value === 0 && (
          <TabPanel value={value} index={0}>
            {userError && (
              <Box display={'flex'} justifyContent="center">
                <div>failed to load</div>
              </Box>
            )}
            {!user && (
              <Box display={'flex'} justifyContent="center">
                <Spinner />
              </Box>
            )}
            {user && <General user={user} />}
          </TabPanel>
        )}
        {value === 1 && (
          <TabPanel value={value} index={1}>
            <JobList userId={id} />
          </TabPanel>
        )}
      </Container>
    </Fixed>
  );
};

export default Employee;
