import { responsiveFontSizes } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import shadows from './shadows';
import { light, dark } from './palette';
import { alpha } from '@mui/material/styles';

const getTheme = (mode, themeToggler) =>
  responsiveFontSizes(
    createTheme({
      palette: mode === 'light' ? light : null,
      shape: {
        borderRadius: 10,
      },
      shadows: shadows(mode),
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        // MuiButton: {
        //   styleOverrides: {
        //     root: {
        //       fontWeight: 600,
        //     },
        //     containedSecondary: mode === 'light' ? { color: 'white' } : {},
        //   },
        // },
        MuiIconButton: {
          styleOverrides: {
            root: {
              // backgroundColor: light.background.level2,
            },
          },
        },
        // MuiTypography: {
        //   styleOverrides: {
        //     root: {
        //       fontWeight: 500,
        //       // borderRadius: 18,
        //     },
        //     containedSecondary: mode === 'light' ? { color: 'white' } : {},
        //   },
        // },
        // MuiInputBase: {
        //   styleOverrides: {
        //     root: {
        //       borderRadius: 12,
        //       '&.Mui-focused': {
        //         boxShadow: `${alpha(light.primary.main, 0.15)} 0 0 0 2px`,
        //         borderColor: light.primary.main,
        //       },
        //     },
        //   },
        // },
        // MuiOutlinedInput: {
        //   styleOverrides: {
        //     root: {
        //       borderRadius: 12,
        //     },
        //     input: {
        //       borderRadius: 12,
        //     },
        //   },
        // },
        // MuiCard: {
        //   styleOverrides: {
        //     root: {
        //       borderRadius: 12,
        //     },
        //   },
        // },
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
