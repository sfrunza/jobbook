import React from 'react';
import Grid from '@mui/material/Grid';
import FormPage from './components/FormPage';
import JobList from './components/JobList/index';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import { Box, Button, Typography, Divider } from '@mui/material';

const Jobs = () => {
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
            <Grid item>
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
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormPage />
          </Grid>
          <Grid item xs={12} md={8}>
            <JobList />
          </Grid>
        </Grid>
      </Container>
    </Fixed>
  );
};

export default Jobs;
