import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export default function PageHeader({ title }) {
  return (
    <Box mb={1}>
      <Typography variant="h4" fontWeight={600} mb={1}>
        {title}
      </Typography>
      <Divider sx={{ mb: 4 }} />
    </Box>
  );
}
