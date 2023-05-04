import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import EmployeeLayout from 'layouts/EmployeeLayout';
import JobsTableWrapper from 'components/JobsTableWrapper';
import Grid from '@mui/material/Grid';
import JobForm from 'components/JobsTableWrapper/components/JobForm';

const Jobs = () => {
  const { id } = useParams();

  return (
    <EmployeeLayout>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <JobForm userId={id} />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* <JobsTableWrapper userId={user.id} /> */}
          <JobsTableWrapper userId={id} />
        </Grid>
      </Grid>
    </EmployeeLayout>
  );
};

export default Jobs;
