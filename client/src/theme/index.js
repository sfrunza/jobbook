import { responsiveFontSizes } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import shadows from './shadows';
import { light } from './palette';

const getTheme = (mode, themeToggler) =>
  responsiveFontSizes(
    createTheme({
      palette: mode === 'light' ? light : null,
      shape: {
        borderRadius: 8,
      },
      shadows: shadows(mode),
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiTooltip: {
          styleOverrides: {
            popper: {
              top: '-10px',
              position: 'absolute',
            },
            tooltip: {
              padding: 8,
              backgroundColor: 'rgba(62, 80, 96, 0.92)',
            },
            arrow: {
              color: 'rgba(62, 80, 96, 0.92)',
            },
          },
        },
        MuiTableRow: {
          styleOverrides: {
            footer: {
              backgroundColor: '#fff',
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              borderBottom: '1px solid #eaeaea',
            },
            footer: {
              color: light.primary.main,
              fontWeight: 'bold',
            },
          },
        },
      },
      themeToggler,
    })
  );

export default getTheme;
