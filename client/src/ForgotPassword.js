import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'components/Container';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';

const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    let formData = new FormData(event.currentTarget);
    let email = formData.get('email');
    axios
      .post('/users/password', {
        user: {
          email: email,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setShow(true);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
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
              Check your email!
            </Typography>
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
              <TextField name="email" type="text" label="Email" />
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
                color="primary"
                size="large"
                disableElevation
              >
                Forgot Password
              </LoadingButton>
              <Link to="/login">Back to Login</Link>
            </Stack>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default ForgotPassword;
