import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {
  DatePickerField,
  SelectField,
  ZipInputField,
  ServiceSelect,
  InputField,
} from '../FormFields';

const times = [
  {
    value: 'Any time',
    label: 'Any time',
  },
  {
    value: '8-9AM',
    label: 'morning',
  },
  {
    value: '12-3PM',
    label: 'noon',
  },
  {
    value: '3-7PM',
    label: 'afternoon',
  },
];

export default function FirstStep(props) {
  const {
    formField: {
      movingDate,
      deliveryDate,
      startTime,
      originZip,
      destinationZip,
      service,
    },
  } = props;

  return (
    <React.Fragment>
      <Box component={Typography} variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Add new Job
        <Divider sx={{ marginY: 2 }} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DatePickerField
            name={movingDate.name}
            label={movingDate.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: 'none', md: 'unset' } }}>
          <InputField name={service.name} label={service.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          asdasd
        </Grid>
      </Grid>
      <ServiceSelect name={service.name} label={service.label} />
    </React.Fragment>
  );
}
