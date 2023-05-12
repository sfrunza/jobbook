import Grid from '@mui/material/Grid';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import Card from '@mui/material/Card';
import UserList from './UserList';
import { useState } from 'react';
import PageHeader from 'components/PageHeader';
import SelectDate from './SelectDate';
import moment from 'moment';

export default function TotalHours() {
  const [month, setMonth] = useState(moment());

  const handleSelect = (date) => {
    setMonth(date);
  };

  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="Total Hours" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ p: 2 }}>
              <SelectDate month={month} handleSelect={handleSelect} />
              <UserList month={month} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fixed>
  );
}
