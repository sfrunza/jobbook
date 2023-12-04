import Grid from '@mui/material/Grid';
import JobForm from 'components/JobsTableWrapper/components/JobForm';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import Card from '@mui/material/Card';
import { useSelector } from 'store';
import JobsTableWrapper from 'components/JobsTableWrapper';
import PageHeader from 'components/PageHeader';
import { Alert, Typography } from '@mui/material';

export default function Jobs() {
  const { user } = useSelector((state) => state.auth);
  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="Jobs" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {user && user.role_names.includes('foreman') && (
              <Alert severity="error" sx={{ mb: 2 }}>
                <Typography fontWeight="500" textTransform="uppercase">
                  Please upload contract and inventory!
                </Typography>
              </Alert>
            )}
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

{
  /* <Alert severity="error">This is an info alert — check it out!</Alert> */
}
