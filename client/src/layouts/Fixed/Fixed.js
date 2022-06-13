import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Topbar, Sidebar } from './components/index';
import pages from './navigation';
import { Outlet } from 'react-router-dom';

const Fixed = ({ children }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  return (
    <Box>
      <AppBar
        position={'fixed'}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          paddingX: 2,
          paddingY: 1,
        }}
        elevation={0}
      >
        <Topbar onSidebarOpen={handleSidebarOpen} />
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant={isMd ? 'permanent' : 'temporary'}
        pages={pages}
      />
      <main>
        <Box height={{ xs: 60, md: 66 }} />
        <Box
          display="flex"
          flex="1 1 auto"
          overflow="hidden"
          paddingLeft={{ md: '256px', minHeight: 'calc(100vh - 67px)' }}
          backgroundColor={'background.level2'}
        >
          <Box display="flex" flex="1 1 auto" overflow="hidden">
            <Box flex="1 1 auto" height="100%" overflow="auto">
              {children}
            </Box>
          </Box>
        </Box>
      </main>
      <Outlet />
    </Box>
  );
};

export default Fixed;
