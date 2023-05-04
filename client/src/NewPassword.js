import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NewPassword = () => {
  let params = new URL(document.location).searchParams;
  let resetToken = params.get('reset_token');
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  function handleSubmit(values) {
    let data = {
      password: values.password,
      password_confirmation: values.passwordConfirmation,
      token: values.token,
    };

    fetch('/api/v1/reset', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.success) {
          setSubmitSuccess('Your password has been changed successfully.');
          formik.setSubmitting(false);
          formik.resetForm();
        } else {
          setSubmitError(res.error);
          formik.setSubmitting(false);
        }
      })
      .catch((error) => {
        setSubmitError(error.message);
        formik.setSubmitting(false);
      });
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
      token: resetToken,
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6, 'Min 6 characters').required('Required'),
      passwordConfirmation: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Box
      sx={{
        bgcolor: 'background.level2',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container>
        <Card
          sx={{
            maxWidth: 500,
            p: { xs: 3, md: 4 },
            marginX: 'auto',
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'divider',
          }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <Stack
            spacing={4}
            direction="column"
            minWidth={{ xs: '100%', sm: 400, md: 400 }}
            margin={'auto'}
          >
            <Typography variant="h4" textAlign="center" fontWeight={500}>
              Change password
            </Typography>
            {submitSuccess && <Alert severity="success">{submitSuccess}</Alert>}
            {submitError && <Alert severity="error">{submitError}</Alert>}
            <Box display="flex" flexDirection="column" gap={1}>
              <label htmlFor="email">New password</label>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  formik.handleChange(e);
                  setSubmitError(null);
                }}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <label htmlFor="password">Confirm password</label>
              <TextField
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Confirm"
                onChange={(e) => {
                  formik.handleChange(e);
                  setSubmitError(null);
                }}
                value={formik.values.passwordConfirmation}
                error={
                  formik.touched.passwordConfirmation &&
                  Boolean(formik.errors.passwordConfirmation)
                }
                helperText={
                  formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
                }
              />
            </Box>
            <LoadingButton
              type="submit"
              loading={formik.isSubmitting}
              variant="contained"
              size="large"
              disableElevation
            >
              Change password
            </LoadingButton>
            <Typography component={Link} to="/login" color="text.secondary">
              Back to Login
            </Typography>
          </Stack>
        </Card>
        {/* <Typography
          color="text.secondary"
          sx={{
            maxWidth: 500,
            p: 1,
            marginX: 'auto',
            textAlign: 'right',
            fontSize: 10,
          }}
        >
          powered by sfrunza
        </Typography> */}
      </Container>
    </Box>
  );
};

export default NewPassword;
