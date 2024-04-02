import React from 'react';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import { useSelector } from 'store';
import { getSettings } from 'slices/settings';
import { useDispatch } from 'store';
import { Grid } from '@mui/material';

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const timeArray = [...range(0.25, 20, 0.25)];

const validationSchema = Yup.object().shape({
  extraTime: Yup.string().nullable(),
});

export default function SettingsForm() {
  const { extraTime } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const { mutate } = useSWRConfig();

  function handleEdit(values, actions) {
    axios
      .patch(`/api/v1/settings/1`, {
        setting: { extra_time: values.extraTime },
      })
      .then((res) => {
        console.log(res);
        if (res.statusText === 'Accepted') {
          toast.success(res.data.message);
          mutate('/api/v1/settings/1');
          actions.setSubmitting(false);
          dispatch(getSettings());
        } else {
          toast.error('Something went wrong');
          actions.setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        actions.setSubmitting(false);
      });
  }

  function _handleSubmit(values, actions) {
    handleEdit(values, actions);
  }

  return (
    <Formik
      initialValues={{
        extraTime: extraTime || '',
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={_handleSubmit}
    >
      {({ isSubmitting, values, handleChange, touched }) => {
        return (
          <Form autoComplete="off">
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs={4}>
                <Box
                  component="label"
                  htmlFor="name"
                  sx={{ fontSize: 14, fontWeight: 500 }}
                >
                  Extra Time
                </Box>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  id="name"
                  size="small"
                  name="extraTime"
                  SelectProps={{
                    native: true,
                  }}
                  value={values.extraTime}
                  onChange={handleChange}
                >
                  <option value={''}></option>
                  {timeArray.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="small"
                  disableElevation
                  sx={{ padding: '8px 16px' }}
                >
                  Save
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
}
