import Fixed from 'layouts/Fixed';
import Container from 'components/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import useSWR from 'swr';
import { useSearchParams } from 'react-router-dom';
import PageHeader from 'components/PageHeader';
import SelectTruck from './SelectTruck';
import TruckImagesForm from './TruckImagesForm';
import PostsTable from './components/PostsTable';
import { useEffect } from 'react';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const TruckImages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const truckParams = searchParams.get('truck');
  const startParams = searchParams.get('start');
  const endParams = searchParams.get('end');

  useEffect(() => {
    if (truckParams) {
      setSearchParams({
        truck: truckParams,
      });
    } else {
      setSearchParams({
        truck: 'all',
      });
    }
  }, []);

  const { data, isLoading, error } = useSWR(
    `/api/v1/posts?truck=${truckParams}&start=${startParams}&end=${endParams}`,
    fetcher
  );

  const handleSelect = (e) => {
    const value = e.target.value;

    if (startParams && endParams) {
      setSearchParams({
        truck: value,
        start: startParams,
        end: endParams,
      });
    } else {
      setSearchParams({
        truck: value,
      });
    }
  };

  const handleFilter = (start, end) => {
    if (truckParams) {
      setSearchParams({
        truck: truckParams,
        start: start,
        end: end,
      });
    } else {
      setSearchParams({
        truck: truckParams,
        start: start,
        end: end,
      });
    }
  };

  return (
    <Fixed>
      <Container maxWidth="xl" sx={{ paddingY: 4 }}>
        <PageHeader title="Truck Photos" />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <TruckImagesForm />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <SelectTruck
                handleSelect={handleSelect}
                handleFilter={handleFilter}
              />
              <PostsTable posts={data} isLoading={isLoading} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Fixed>
  );
};

export default TruckImages;
