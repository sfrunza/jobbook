import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/Container';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ForgotPassword = () => {
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  function handleSubmit(values) {
    axios
      .post('/users/password', {
        user: {
          email: values.email,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          setSubmitSuccess('Check your Email for instructions.');
          formik.setSubmitting(false);
          formik.resetForm();
        } else {
          setSubmitError(res.data.error);
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
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
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
              Forgot password?
            </Typography>
            {submitSuccess && <Alert severity="success">{submitSuccess}</Alert>}
            {submitError && <Alert severity="error">{submitError}</Alert>}
            <Box display="flex" flexDirection="column" gap={1}>
              <label htmlFor="email">Email</label>
              <TextField
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  formik.handleChange(e);
                  setSubmitError(null);
                }}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Box>
            <LoadingButton
              type="submit"
              loading={formik.isSubmitting}
              variant="contained"
              size="large"
              disableElevation
            >
              Request password reset
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

export default ForgotPassword;
