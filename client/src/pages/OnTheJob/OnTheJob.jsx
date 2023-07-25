import Grid from '@mui/material/Grid';
// import JobForm from 'components/JobsTableWrapper/components/JobForm';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import Card from '@mui/material/Card';
// import { useSelector } from 'store';
// import JobsTableWrapper from 'components/JobsTableWrapper';
import PageHeader from 'components/PageHeader';
import Main from './Main';
// import Menu from './Menu';

export default function OnTheJob() {
  //   const { user } = useSelector((state) => state.auth);
  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="On The Job" />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* <Card sx={{ p: 2 }}> */}
            <Main />
            {/* </Card> */}
            {/* </Grid> */}
            {/* <Grid item xs={12} md={9}> */}
            {/* <JobsTableWrapper userId={user.id} /> */}
          </Grid>
        </Grid>
      </Container>
    </Fixed>
  );
}
