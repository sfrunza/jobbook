import React from 'react';
import { Box, Grid, TextField } from '@mui/material';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';

const formInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  role: '',
  username: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().nullable().required('first'),
  lastName: Yup.string().nullable().required('last'),
  email: Yup.string().nullable().required('email'),
  password: Yup.string().nullable().required('pass'),
  passwordConfirmation: Yup.string().nullable().required('pass conf'),
  role: Yup.string().nullable().required('role req'),
});

export default function NewUserForm({ handleClose }) {
  const { mutate } = useSWRConfig();

  async function _submitForm(values, actions) {
    const user = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      password_confirmation: values.passwordConfirmation,
      role: values.role,
      admin: false,
      username: values.username,
    };
    try {
      const resp = await fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      let newJob = await resp.json();

      if (newJob.id) {
        toast.success('User Added');
        actions.resetForm();
        mutate('/api/v1/filter-users?&role=all&search=');
        handleClose();
      } else {
        const errArray = [];
        for (const key in newJob) {
          if (newJob.hasOwnProperty(key)) {
            let str = key + ' ' + newJob[key];
            errArray.push(str);
          }
        }
        toast.error(errArray);
      }

      actions.setSubmitting(false);
    } catch (error) {
      console.error('error', error);
    }
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
                  <TextField
                    name="firstName"
                    label="First Name"
                    value={values.firstName}
                    onChange={handleChange}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="lastName"
                    label="Last Name"
                    value={values.lastName}
                    onChange={handleChange}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="username"
                    label="Username"
                    value={values.username}
                    onChange={handleChange}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    onChange={handleChange}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="password"
                    label="Password"
                    value={values.password}
                    onChange={handleChange}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    fullWidth
                    name="role"
                    SelectProps={{
                      native: true,
                    }}
                    defaultValue=""
                    label="Role"
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
                  Add user
                </LoadingButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
