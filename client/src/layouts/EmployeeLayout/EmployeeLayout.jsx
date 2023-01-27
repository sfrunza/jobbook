import Container from 'components/Container';
import Fixed from 'layouts/Fixed';
import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { Box, Grid, Typography, Divider, Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function EmployeeLayout({ children }) {
  const params = useParams();
  const { pathname } = useLocation();
  const pathArr = pathname.split('/');
  const path = pathArr[pathArr.length - 1];
  const navigate = useNavigate();
  const id = Number(params.id);

  const { data, isLoading } = useSWR(`/api/v1/users/${id}`, fetcher);

  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <Box sx={{ position: 'relative', top: '-16px' }}>
          <Button
            onClick={() => navigate('/employees')}
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
              {isLoading && (
                <Skeleton variant="rounded" width={149} height={32} />
              )}
              {data && (
                <Typography variant="h5" fontWeight={600}>
                  {data?.first_name + ' ' + data?.last_name}
                </Typography>
              )}
            </Grid>
            <Grid item>{/* <NewUserDialog /> */}</Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box paddingX={2} pb={3} display="flex" gap={3}>
          <Typography
            component={Link}
            to={`/employees/${id}/general`}
            sx={{
              textTransform: 'uppercase',
              color: path === 'general' ? 'primary.main' : 'text.secondary',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            General
          </Typography>
          <Typography
            component={Link}
            to={`/employees/${id}/jobs`}
            sx={{
              textTransform: 'uppercase',
              color: path === 'jobs' ? 'primary.main' : 'text.secondary',
              fontWeight: 500,
              fontSize: '0.875rem',
            }}
          >
            Jobs
          </Typography>
        </Box>
        {children}
      </Container>
    </Fixed>
  );
}
