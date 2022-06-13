import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'store';

const SidebarNav = ({ pages, onClose }) => {
  const theme = useTheme();
  let location = useLocation();
  const { user } = useSelector((state) => state.auth);
  let pg = new Array(pages[0]);
  if (user && user.admin) {
    pg = pages;
  }
  return (
    <Box paddingBottom={2}>
      <Box
        justifyContent={'space-between'}
        display={{ xs: 'flex', md: 'none' }}
        alignItems="center"
      >
        <Typography variant="h6">Raimond's Movers</Typography>
        <IconButton onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box paddingX={2} paddingY={2} marginTop={1}>
        {pg?.map((p, i) => (
          <Box marginBottom={2} key={i}>
            <Link to={p.href}>
              <Button
                component={'span'}
                target={p.target}
                fullWidth
                onClick={() => onClose()}
                sx={{
                  justifyContent: 'flex-start',
                  color:
                    location.pathname === p.href
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  backgroundColor:
                    location.pathname === p.href
                      ? alpha(theme.palette.primary.main, 0.1)
                      : 'transparent',
                  fontWeight: 600,
                  // fontSize: theme.spacing(2),
                }}
              >
                {p.title}
              </Button>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SidebarNav;
