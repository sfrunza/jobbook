import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import SidebarNav from './components/SidebarNav';

const Sidebar = ({ pages, open, variant, onClose }) => {
  return (
    <Drawer
      anchor="left"
      onClose={() => onClose()}
      open={open}
      variant={variant}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'background.paper',
          width: '100%',
          maxWidth: 256,
          top: { xs: 0, md: 67 },
          height: { xs: '100%', md: 'calc(100% - 67px)' },
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          padding: 1,
        }}
      >
        <SidebarNav pages={pages} onClose={onClose} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
