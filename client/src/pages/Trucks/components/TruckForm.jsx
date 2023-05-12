import { useSWRConfig } from 'swr';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import axios from 'axios';
import Button from '@mui/material/Button';

const validationSchema = Yup.object().shape({
  name: Yup.string().nullable().required('required'),
});

export default function TruckForm({ selectedTruck, resetForm }) {
  const { mutate } = useSWRConfig();

  function _submitForm(values, actions) {
    axios
      .post('/api/v1/trucks', { truck: values })
      .then((res) => {
        if (res.statusText === 'Created') {
          toast.success(res.data.message);
          mutate('/api/v1/trucks');
          actions.setSubmitting(false);
          actions.resetForm();
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

  function handleEdit(values, actions) {
    axios
      .patch(`/api/v1/trucks/${selectedTruck.id}`, { truck: values })
      .then((res) => {
        console.log(res);
        if (res.statusText === 'Accepted') {
          toast.success(res.data.message);
          mutate('/api/v1/trucks');
          actions.setSubmitting(false);
          resetForm();
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
    if (selectedTruck) {
      handleEdit(values, actions);
    } else {
      _submitForm(values, actions);
    }
  }

  return (
    <Formik
      initialValues={
        selectedTruck ? { name: selectedTruck.name } : { name: '' }
      }
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={_handleSubmit}
    >
      {({ isSubmitting, values, handleChange, touched }) => {
        return (
          <Form autoComplete="off">
            <Box
              component="label"
              htmlFor="name"
              sx={{ fontSize: 14, fontWeight: 500 }}
            >
              Truck Name
            </Box>
            <Box
              display="flex"
              gap={1}
              justifyContent="space-between"
              alignItems="end"
            >
              <TextField
                size="small"
                name="name"
                placeholder="EX. Truck 1"
                value={values.name}
                onChange={handleChange}
                fullWidth
              />
              {selectedTruck && (
                <Button
                  variant="contained"
                  color="inherit"
                  disableElevation
                  size="small"
                  onClick={() => resetForm()}
                  sx={{ padding: '8px 16px' }}
                >
                  Cancel
                </Button>
              )}
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
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}
