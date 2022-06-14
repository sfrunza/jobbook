import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/Container';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';

const NewPassword = () => {
  let params = new URL(document.location).searchParams;
  let resetToken = params.get('reset_token');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    let formData = new FormData(event.currentTarget);
    let password = formData.get('password');
    let passwordConfirmation = formData.get('passwordConfirmation');
    let data = {
      password: password,
      password_confirmation: passwordConfirmation,
      token: resetToken,
      email: 'frunza.sergiu3@gmail.com',
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
      .then((response) => {
        console.log(response);
        if (!!response.error) {
          console.log(response.error);
          setLoading(false);
        } else {
          setLoading(false);
          setShow(true);
        }
      })
      .catch(console.log);
  }

  return (
    <Container>
      {show ? (
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          mt={20}
        >
          <Stack
            spacing={2}
            direction="column"
            minWidth={{ xs: 350, md: 400 }}
            margin={'auto'}
          >
            <Typography sx={{ textAlign: 'center' }}>
              Email changed !
            </Typography>
            <Link to="/login">Go to Login page</Link>
          </Stack>
        </Box>
      ) : (
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
              minWidth={{ xs: 350, md: 400 }}
              margin={'auto'}
            >
              <TextField name="password" type="password" label="New password" />
              <TextField
                name="passwordConfirmation"
                type="password"
                label="Confirm new password"
              />
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                color="primary"
                size="large"
                disableElevation
              >
                Change my password
              </LoadingButton>
              <Link to="/login">Login</Link>
            </Stack>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default NewPassword;
