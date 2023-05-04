import Grid from '@mui/material/Grid';
import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
// import Header from './Header';
import Card from '@mui/material/Card';
import { useSelector } from 'store';
import TruckForm from './components/TruckForm';
import TruckList from './components/TruckList';
import { useState } from 'react';
// import Divider from '@mui/material/Divider';
import PageHeader from 'components/PageHeader';

export default function Trucks() {
  const { user } = useSelector((state) => state.auth);
  const [selectedTruck, setSelectedTruck] = useState(null);

  const selectTruck = (truck) => {
    setSelectedTruck(truck);
  };

  const resetForm = () => {
    setSelectedTruck(null);
  };

  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="Trucks" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ p: 2 }}>
              <TruckForm selectedTruck={selectedTruck} resetForm={resetForm} />
              {/* <Divider sx={{ marginY: 2 }} /> */}
              <TruckList selectTruck={selectTruck} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fixed>
  );
}
