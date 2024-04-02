import Card from '@mui/material/Card';
import Container from 'components/Container';
import PageHeader from 'components/PageHeader';
import Fixed from 'layouts/Fixed';
import SettingsForm from './SettingsForm';
import { Grid } from '@mui/material';

export default function Settings() {
  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="Settings" />
        <Card sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <SettingsForm />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Fixed>
  );
}
