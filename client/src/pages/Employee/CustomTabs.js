import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function CustomTabs({ value, handleChange }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="General" {...a11yProps(0)} disableRipple />
          <Tab label="Jobs" {...a11yProps(1)} disableRipple />
          <Tab label="Security" {...a11yProps(2)} disableRipple />
        </Tabs>
      </Box>
    </Box>
  );
}
