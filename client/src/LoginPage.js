import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from 'components/Container';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from './store/index';
import { loginUser } from 'slices/auth';

const LoginPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let { isLoggingIn, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  let from = location.state?.from?.pathname || '/dashboard/calendar';

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');
    let data = { email, password };
    dispatch(loginUser(data, navigate));

    // auth.signin(data, () => {
    //   // Send them back to the page they tried to visit when they were
    //   // redirected to the login page. Use { replace: true } so we don't create
    //   // another entry in the history stack for the login page.  This means that
    //   // when they get to the protected page and click the back button, they
    //   // won't end up back on the login page, which is also really nice for the
    //   // user experience.
    //   navigate(from, { replace: true });
    // });
  }

  // console.log(error);
  // console.log(isLoggingIn);
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          mt={20}
        >
          {error && <>{error}</>}
          <Stack
            spacing={2}
            direction="column"
            minWidth={{ xs: 350, md: 400 }}
            margin={'auto'}
          >
            <TextField name="email" type="text" label="Email" />
            <TextField name="password" type="password" label="Password" />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Loading...' : 'Login'}
            </Button>
          </Stack>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
