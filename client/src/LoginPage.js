import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from './store/index';
import { loginUser } from 'slices/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginPage = () => {
  let navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();

  const login = (user) => {
    axios
      .post('/users/sign_in', { user }, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.user) {
          let user = res.data.user;
          dispatch(loginUser(user));
        } else {
          setLoginError(res.data.error);
          formik.setSubmitting(false);
        }
      })
      .catch((error) => {
        setLoginError(error.message);
        formik.setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Required'),
    }),
    onSubmit: (values) => {
      login(values);
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
              Log in
            </Typography>
            {/* <Typography>{loginError}</Typography> */}
            {loginError && <Alert severity="error">{loginError}</Alert>}
            <Box display="flex" flexDirection="column" gap={1}>
              <label htmlFor="email">Email</label>
              <TextField
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  formik.handleChange(e);
                  setLoginError(null);
                }}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <label htmlFor="password">Password</label>
              <TextField
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  formik.handleChange(e);
                  setLoginError(null);
                }}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
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
              Login
            </LoadingButton>
            <Typography
              component={Link}
              to="/forgot-password"
              color="text.secondary"
            >
              Forgot password?
            </Typography>
          </Stack>
        </Card>
        <Typography
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
        </Typography>
      </Container>
    </Box>
  );
};

export default LoginPage;
