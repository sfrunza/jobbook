import Grid from '@mui/material/Grid';
import JobForm from 'components/JobsTableWrapper/components/JobForm';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import Card from '@mui/material/Card';
import { useSelector } from 'store';
import JobsTableWrapper from 'components/JobsTableWrapper';
import PageHeader from 'components/PageHeader';

export default function Jobs() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="Jobs" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <JobForm userId={user.id} />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <JobsTableWrapper userId={user.id} />
          </Grid>
        </Grid>
      </Container>
    </Fixed>
  );
}
