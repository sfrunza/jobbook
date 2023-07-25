import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import Card from '@mui/material/Card';
import UserList from './UserList';
import { useState } from 'react';
import PageHeader from 'components/PageHeader';
import SelectDate from './SelectDate';
import moment from 'moment';
import SelectRange from './SelectRange';

export default function TotalHours() {
  const [month, setMonth] = useState(moment());

  const [filterData, setFilterData] = useState({});

  const handleSelect = (date) => {
    setMonth(date);
    setFilterData({});
  };

  const handleFilter = (start, end) => {
    setFilterData({ start: start, end: end });
  };

  const handleResetFilter = () => {
    setFilterData({});
  };

  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="Total Hours" />
        <Card sx={{ p: 2, maxWidth: 450 }}>
          <SelectDate month={month} handleSelect={handleSelect} />
          <SelectRange
            handleFilter={handleFilter}
            handleResetFilter={handleResetFilter}
          />
          <UserList month={month} filterData={filterData} />
        </Card>
      </Container>
    </Fixed>
  );
}
