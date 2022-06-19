import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'components/Container';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from './store/index';
import { loginUser } from 'slices/auth';

const LoginPage = () => {
  let navigate = useNavigate();
  let { isLoggingIn, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');
    let data = { email, password };
    dispatch(loginUser(data, navigate));
  }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          mt={20}
        >
          <Stack
            spacing={2}
            direction="column"
            minWidth={{ xs: '100%', sm: 400, md: 400 }}
            margin={'auto'}
          >
            {error && (
              <Box sx={{ color: 'error.main' }}>
                <Typography>{error}</Typography>
              </Box>
            )}
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
            <Typography
              component={Link}
              to="/forgot-password"
              variant="caption"
              color="textSecondary"
            >
              Forgot password
            </Typography>
          </Stack>
        </Box>
      </form>
    </Container>
  );
};

export default LoginPage;
