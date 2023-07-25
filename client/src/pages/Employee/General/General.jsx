import EmployeeLayout from 'layouts/EmployeeLayout/EmployeeLayout';
import { Box, Grid, TextField, Card, Switch, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useSelector } from 'store';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Spinner from 'components/Spinner';
import PhoneInput from 'pages/Employees/PhoneInput';
import RoleSelectInput from 'pages/Employees/RoleSelectInput';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().nullable().required('required'),
  lastName: Yup.string().nullable().required('required'),
  username: Yup.string().nullable().required('required'),
  email: Yup.string().nullable().required('required'),
  roleNames: Yup.array()
    .min(1, 'required at least 1 role')
    .required('required'),
});

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function General() {
  const { id } = useParams();
  const { data, isLoading } = useSWR(`/api/v1/users/${id}`, fetcher);
  const { mutate } = useSWRConfig();
  const { user: currentUser } = useSelector((state) => state.auth);

  let formInitialValues = {
    firstName: data?.first_name,
    lastName: data?.last_name,
    email: data?.email,
    roleNames: data?.role_names,
    phone: data?.phone || '',
    active: data?.active,
    username: data?.username,
    admin: data?.admin,
  };

  function _submitForm(values, actions) {
    const user = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      active: values.active,
      role_names: values.roleNames,
      admin: values.admin,
      username: values.username,
    };

    axios
      .put(`/api/v1/users/${id}`, { user })
      .then((res) => {
        if (res.data.status === 'accepted') {
          toast.success(res.data.message);
          mutate(`/api/v1/users/${id}`);
          actions.setSubmitting(false);
        } else {
          toast.error('Something went wrong');
          actions.setSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
        actions.setSubmitting(false);
      });
  }
  function _handleSubmit(values, actions) {
    _submitForm(values, actions);
  }

  return (
    <EmployeeLayout>
      <Card sx={{ p: 2, maxWidth: 'sm' }}>
        {isLoading && <Spinner />}
        {data && (
          <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            onSubmit={_handleSubmit}
          >
            {({
              isSubmitting,
              values,
              handleChange,
              setFieldValue,
              touched,
              errors,
            }) => {
              return (
                <Form autoComplete="off">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Box
                        component="label"
                        htmlFor="firstName"
                        sx={{ fontSize: 14, fontWeight: 500 }}
                      >
                        First Name
                      </Box>
                      <TextField
                        size="small"
                        id="firstName"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        component="label"
                        htmlFor="lastName"
                        sx={{ fontSize: 14, fontWeight: 500 }}
                      >
                        Last Name
                      </Box>
                      <TextField
                        size="small"
                        id="lastName"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        component="label"
                        htmlFor="username"
                        sx={{ fontSize: 14, fontWeight: 500 }}
                      >
                        Username
                      </Box>
                      <TextField
                        size="small"
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        error={Boolean(touched.username && errors.username)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        component="label"
                        htmlFor="phone"
                        sx={{ fontSize: 14, fontWeight: 500 }}
                      >
                        Phone
                      </Box>
                      <PhoneInput
                        size="small"
                        id="phone"
                        name="phone"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box
                        component="label"
                        htmlFor="email"
                        sx={{ fontSize: 14, fontWeight: 500 }}
                      >
                        Email
                      </Box>
                      <TextField
                        size="small"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box
                        // component="label"
                        // htmlFor="roleNames"
                        sx={{ fontSize: 14, fontWeight: 500 }}
                      >
                        Roles
                      </Box>
                      <RoleSelectInput
                        setFieldValue={setFieldValue}
                        id="roleNames"
                        name="roleNames"
                        initVal={values.roleNames}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" alignItems="center">
                        <Typography variant="body2">Active</Typography>
                        <Switch
                          name="active"
                          checked={values.active}
                          onChange={handleChange}
                        />
                      </Box>
                    </Grid>
                    {data?.id !== currentUser.id && (
                      <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                          <Typography variant="body2">Admin</Typography>
                          <Switch
                            name="admin"
                            checked={values.admin}
                            onChange={handleChange}
                          />
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                  <Box display="flex" mt={2} justifyContent="flex-end">
                    <LoadingButton
                      type="submit"
                      loading={isSubmitting}
                      variant="contained"
                      color="primary"
                      size="large"
                      disableElevation
                    >
                      Update
                    </LoadingButton>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        )}
      </Card>
    </EmployeeLayout>
  );
}
