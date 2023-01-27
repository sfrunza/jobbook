import React from 'react';
import { Box, Grid, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import axios from 'axios';
import PhoneInput from './PhoneInput';

const formInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  role: '',
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
  role: Yup.string().nullable().required('required'),
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
      role: values.role,
      username: values.username,
    };

    axios
      .post('/api/v1/users', { user })
      .then((res) => {
        if (res.data.status === 'created') {
          toast.success(res.data.message);
          mutate('/api/v1/filter_users?&role=all&search=');
          actions.setSubmitting(false);
          actions.resetForm();
          handleClose();
        } else {
          toast.error('Something went wrong');
          actions.setSubmitting(false);
        }
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        actions.setSubmitting(false);
      });
    // try {
    //   const resp = await fetch('/api/v1/users', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(user),
    //   });
    //   let newJob = await resp.json();

    //   if (newJob.id) {
    //     toast.success('User Added');
    //     actions.resetForm();
    //     mutate('/api/v1/filter_users?&role=all&search=');
    //     handleClose();
    //   } else {
    //     const errArray = [];
    //     for (const key in newJob) {
    //       if (newJob.hasOwnProperty(key)) {
    //         let str = key + ' ' + newJob[key];
    //         errArray.push(str);
    //       }
    //     }
    //     toast.error(errArray);
    //   }

    //   actions.setSubmitting(false);
    // } catch (error) {
    //   console.error('error', error);
    // }
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
        {({ isSubmitting, values, handleChange, touched, errors }) => {
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
                    helperText={touched.firstName && errors.firstName}
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
                    helperText={touched.lastName && errors.lastName}
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
                    helperText={touched.username && errors.username}
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
                  {/* <PhoneInput
                    size="small"
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    fullWidth
                  /> */}
                  <PhoneInput size="small" id="phone" name="phone" fullWidth />
                  {/* <Box
                    component="label"
                    htmlFor="phone"
                    sx={{ fontSize: 14, fontWeight: 500 }}
                  >
                    Phone
                  </Box>
                  <TextField
                    size="small"
                    id="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                    fullWidth
                  /> */}
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
                    helperText={touched.email && errors.email}
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
                    helperText={touched.password && errors.password}
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
                    helperText={
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    component="label"
                    htmlFor="role"
                    sx={{ fontSize: 14, fontWeight: 500 }}
                  >
                    Role
                  </Box>
                  <TextField
                    size="small"
                    id="role"
                    select
                    fullWidth
                    name="role"
                    SelectProps={{
                      native: true,
                    }}
                    value={values.role}
                    onChange={handleChange}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  >
                    <option value={''}></option>
                    {['helper', 'driver', 'foreman'].map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    name="passwordConfirmation"
                    label="Confirm Password"
                    value={values.passwordConfirmation}
                    onChange={handleChange}
                    error={Boolean(
                      touched.passwordConfirmation &&
                        errors.passwordConfirmation
                    )}
                    helperText={
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                    }
                    fullWidth
                  />
                </Grid> */}
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
