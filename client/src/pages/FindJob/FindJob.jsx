import { useState, useRef } from 'react';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import useSWR from 'swr';
import Spinner from 'components/Spinner';
import JobTable from './JobTable';
import { useSearchParams } from 'react-router-dom';
import PageHeader from 'components/PageHeader';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const FindJob = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [search, setSearch] = useState(query);
  const queryRef = useRef(null);

  const { data, error, isLoading } = useSWR(
    search.length < 1 ? null : `/api/v1/find_job?search=${search}`,
    fetcher
  );
  const jobs = data?.jobs;

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSearch('');
  };

  const searchJob = (e) => {
    e.preventDefault();
    setSearch(query);
    setSearchParams({
      search: query,
    });
  };

  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="Find Job" />
        <Card
          sx={{
            p: 2,
          }}
        >
          <Box component="form" onSubmit={searchJob} marginBottom={2}>
            <TextField
              value={query}
              onChange={handleQueryChange}
              inputProps={{ ref: queryRef }}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      width="22"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </InputAdornment>
                ),
              }}
              placeholder="Search by ID"
            />
          </Box>
          {error && (
            <Box display={'flex'} justifyContent="center" p={2}>
              <div>failed to load</div>
            </Box>
          )}
          {search && !jobs && (
            <Box display={'flex'} justifyContent="center" p={2}>
              <Spinner withText />
            </Box>
          )}
          {search && jobs && jobs.length === 0 && (
            <Box display={'flex'} justifyContent="center" p={2}>
              <div>no records found</div>
            </Box>
          )}
          {jobs && jobs.length > 0 && (
            <JobTable jobs={jobs} isLoading={isLoading} />
          )}
        </Card>
      </Container>
    </Fixed>
  );
};

export default FindJob;
