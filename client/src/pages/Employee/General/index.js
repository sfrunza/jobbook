import React from 'react';
import { Box, Grid, TextField, Card, Switch, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { useSelector } from 'store';

const formattedKey = (word) => {
  // lastName -> last_name
  return word
    .split(/(?=[A-Z])/)
    .join('_')
    .toLowerCase();
};

const isEqual = (values, user) => {
  let arr = Object.keys(values);
  let eq = false;

  arr.map((item) => {
    // console.log(user[formattedKey(item)]);
    if (typeof values[item] === typeof user[formattedKey(item)]) {
      if (values[item] !== user[formattedKey(item)]) {
        eq = true;
      }
    }
  });
  return eq;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().nullable().required('first'),
  lastName: Yup.string().nullable().required('last'),
  email: Yup.string().nullable().required('email'),
  role: Yup.string().nullable().required('role req'),
});

export default function General({ user }) {
  const { mutate } = useSWRConfig();
  const { first_name, last_name, email, role, username, admin } = user;
  const { user: currentUser } = useSelector((state) => state.auth);

  let formInitialValues = {
    firstName: first_name,
    lastName: last_name,
    email: email,
    role: role,
    username: username,
    admin: admin,
  };

  async function _submitForm(values, actions) {
    const data = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      role: values.role,
      admin: values.admin,
      username: values.username,
    };
    try {
      const resp = await fetch(`/api/v1/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      let newUser = await resp.json();

      if (newUser.id) {
        toast.success('User Updated');
        mutate(`/api/v1/users/${newUser.id}`);
      } else {
        const errArray = [];
        for (const key in newUser) {
          if (newUser.hasOwnProperty(key)) {
            let str = key + ' ' + newUser[key];
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
    <Card sx={{ p: 4 }}>
      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={_handleSubmit}
      >
        {({ isSubmitting, values, handleChange, touched, errors }) => {
          return (
            <Form autoComplete="off">
              <Grid container spacing={4}>
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
                <Grid item xs={6} md={6}>
                  <TextField
                    select
                    fullWidth
                    name="role"
                    SelectProps={{
                      native: true,
                    }}
                    value={values.role}
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
                {user.id !== currentUser.id && (
                  <Grid item xs={12}>
                    <Box display={'flex'} alignItems="center">
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
              <Box display={'flex'} mt={2} justifyContent="flex-end">
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  color="primary"
                  size="large"
                  disableElevation
                  disabled={!isEqual(values, user)}
                >
                  Update user
                </LoadingButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Card>
  );
}
