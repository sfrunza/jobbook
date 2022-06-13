import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {
  InputField,
  EmailInput,
  PhoneInput,
  ReferralFiled,
} from '../FormFields';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ContactInfo(props) {
  const {
    formField: { firstName, lastName, email, phone, additionalInfo, referral },
  } = props;

  const [value, setValue] = React.useState('yelp');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <Box
        component={Typography}
        variant="h5"
        sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}
      >
        Fill Contact Info
        <Divider sx={{ marginY: 2 }} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <EmailInput name={email.name} label={email.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <PhoneInput name={phone.name} label={phone.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={additionalInfo.name}
            label={additionalInfo.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <ReferralFiled name={referral.name} label={referral.label} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
