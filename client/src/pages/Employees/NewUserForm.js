import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import * as Yup from 'yup';
import axios from 'axios';
import PhoneInput from './PhoneInput';
import RoleSelectInput from './RoleSelectInput';

const formInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  roleNames: [],
  username: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().nullable().required('required'),
  lastName: Yup.string().nullable().required('required'),
  email: Yup.string().nullable().required('required').email(),
  phone: Yup.string().nullable().required('required'),
  password: Yup.string().nullable().required('required'),
  passwordConfirmation: Yup.string()
    .required('required')
    .oneOf([Yup.ref('password')], 'passwords do not match.'),
  roleNames: Yup.array()
    .min(1, 'required at least 1 role')
    .required('required'),
});

export default function NewUserForm({ handleClose }) {
  const { mutate } = useSWRConfig();

  async function _submitForm(values, actions) {
    const user = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
      role_names: values.roleNames,
      username: values.username,
    };

    axios
      .post('/api/v1/users', { user })
      .then((res) => {
        if (res.data.status === 'created') {
          toast.success(res.data.message);
          mutate('/api/v1/filter_users?&role=active&search=');
          actions.setSubmitting(false);
          actions.resetForm();
          handleClose();
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
    _submitForm(values, actions);
  }

  return (
    <React.Fragment>
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
              <Grid container spacing={2}>
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
                  <PhoneInput size="small" id="phone" name="phone" fullWidth />
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
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    component="label"
                    htmlFor="password"
                    sx={{ fontSize: 14, fontWeight: 500 }}
                  >
                    Password
                  </Box>
                  <TextField
                    size="small"
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    component="label"
                    htmlFor="passwordConfirmation"
                    sx={{ fontSize: 14, fontWeight: 500 }}
                  >
                    Confirm Password
                  </Box>
                  <TextField
                    size="small"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    error={Boolean(
                      touched.passwordConfirmation &&
                        errors.passwordConfirmation
                    )}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Box component="span" sx={{ fontSize: 14, fontWeight: 500 }}>
                    Roles
                  </Box>
                  <RoleSelectInput
                    setFieldValue={setFieldValue}
                    id="roleNames"
                    name="roleNames"
                  />
                </Grid>
              </Grid>
              <Box display={'flex'} mt={2} justifyContent="flex-end">
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  disableElevation
                >
                  Add Employee
                </LoadingButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
