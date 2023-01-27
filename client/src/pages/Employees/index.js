import { useState, useRef } from 'react';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import UserListTable from './UserListTable';
import {
  Box,
  Typography,
  Divider,
  InputAdornment,
  Tab,
  Card,
  Tabs,
  TextField,
} from '@mui/material';
import useSWR from 'swr';
import Spinner from 'components/Spinner';
import NewUserDialog from './NewUserDialog';

const tabs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'foreman',
    value: 'foreman',
  },
  {
    label: 'driver',
    value: 'driver',
  },
  {
    label: 'helper',
    value: 'helper',
  },
];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Employees = () => {
  const [currentTab, setCurrentTab] = useState('all');
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const queryRef = useRef(null);

  const { data, error } = useSWR(
    `/api/v1/filter_users?&role=${currentTab}&search=${search}`,
    fetcher
  );

  const handleTabsChange = (event, value) => {
    setSearch('');
    setQuery('');
    setCurrentTab(value);
  };
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const searchUser = (e) => {
    e.preventDefault();
    setCurrentTab('all');
    setSearch(query);
  };

  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h4" fontWeight={600}>
            Employees
          </Typography>
          <NewUserDialog />
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Card>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            sx={{ px: 3 }}
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                disableRipple
              />
            ))}
          </Tabs>
          <Divider />
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexWrap: 'wrap',
              p: 2,
            }}
          >
            <Box
              component="form"
              onSubmit={searchUser}
              sx={{
                flexGrow: 1,
                m: 1.5,
              }}
            >
              <TextField
                value={query}
                fullWidth
                onChange={handleQueryChange}
                inputProps={{ ref: queryRef }}
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
                placeholder="Search"
              />
            </Box>
          </Box>
          {error && (
            <Box display={'flex'} justifyContent="center" p={2}>
              <div>failed to load</div>
            </Box>
          )}
          {!data && (
            <Box display={'flex'} justifyContent="center" p={2}>
              <Spinner />
            </Box>
          )}
          {data && <UserListTable users={data} currentTab={currentTab} />}
        </Card>
      </Container>
    </Fixed>
  );
};

export default Employees;
