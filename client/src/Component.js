import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from 'components/Container';
import Fixed from 'layouts/Fixed';

export default function Component() {
  return (
    <Fixed>
      <Container>
        <Stack spacing={2} direction="row">
          <Button variant="text">Text</Button>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
      </Container>
    </Fixed>
  );
}
