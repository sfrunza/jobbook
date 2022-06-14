import React from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'store';
import { Avatar, Badge } from '@mui/material';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: '-1',
      left: '-1',
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(1.4)',
      opacity: 0,
    },
  },
}));

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
      <Box
        p={2}
        m={2}
        marginTop={{ xs: 4, md: 1 }}
        sx={{
          backgroundColor: 'background.level2',
          borderRadius: '10px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt="avatar" />
        </StyledBadge>
        <Box ml={2}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
            }}
          >
            Hello, {user.first_name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            online
          </Typography>
        </Box>
      </Box>
      <Box paddingX={2} marginTop={2}>
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
