/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';

const StyledTextField = styled((props) => <FormControlLabel {...props} />)(
  ({ theme }) => ({
    '& .MuiFormControlLabel-root': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    '& .MuiRadio-root': {
      display: 'none',
      textAlign: 'center',
    },
  })
);

const CustomLabel = ({ label, value, checked }) => {
  const theme = useTheme();
  return (
    <StyledTextField
      value={value}
      control={
        <Radio
          size="small"
          sx={{
            color: checked
              ? theme.palette.primary.contrastText
              : theme.palette.text.secondary,
          }}
        />
      }
      label={label}
      sx={{
        backgroundColor: checked
          ? theme.palette.primary.main
          : theme.palette.background.paper,
        color: checked
          ? theme.palette.primary.contrastText
          : theme.palette.text.secondary,
          '&:hover': {
            color: checked
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,

          },
        // boxShadow: theme.shadows[1],
        // width: '100%',
        display: 'flex',
        boxShadow:
          '0 0 1px 0 rgb(0 0 0 / 31%), 0 3px 4px -2px rgb(0 0 0 / 25%)',
        justifyContent: 'center',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
        // marginRight: 'unset',
        padding: { sm: '6px 4px', xs: '6px 2px' },
        // padding: 8px 16px;
        // width: 'fit-content',
        // marginLeft: 'unset',
        margin: 0,
        minWidth: { sm: 45, xs: 36 },
      }}
    />
  );
};

const FloorSelect = (props) => {
  const { errorText, ...rest } = props;
  const [field, meta] = useField(props);
  const val = field.value;
  const name = field.name.split(/(?=[A-Z])/)[0]; //origin ||  destination
  const { touched, error } = meta;

  return (
    <Box pt={3}>
      <Box>
        <Box
          component={Typography}
          variant={'subtitle1'}
          fontWeight={600}
          gutterBottom
          htmlFor={field.name}
          display="flex"
          sx={{
            color: touched && error ? 'error.main' : 'text.primary',
          }}
        >
          <Box
            sx={{
              color: touched && error ? 'error.main' : 'text.primary',
            }}
            mr={1}
            position={'relative'}
            top={2}
          >
            <svg
              className="MuiSvgIcon-root jss215"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
              width="20"
            >
              <svg
                viewBox="0 0 18 18"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8564 9.94641H13.1851C12.7967 9.94641 12.4819 10.2612 12.4819 10.6495C12.4819 11.0379 12.7967 11.3527 13.1851 11.3527H14.1594L10.7865 14.7255C10.5119 15.0001 10.5119 15.4453 10.7865 15.7198C11.0611 15.9944 11.5063 15.9945 11.7809 15.7199L15.1538 12.347V13.3214C15.1538 13.7097 15.4686 14.0245 15.8569 14.0245C16.2453 14.0245 16.5601 13.7097 16.5601 13.3214V10.6495C16.5601 10.6494 16.5601 10.6493 16.5601 10.6492C16.5598 10.2671 16.2493 9.94613 15.8564 9.94641Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
                <path
                  d="M17.2969 2.07422H13.1485C12.7601 2.07422 12.4453 2.38901 12.4453 2.77734V6.22266H9.00004C8.61173 6.22266 8.29691 6.53745 8.29691 6.92578V10.3711H4.8516C4.46326 10.3711 4.14847 10.6859 4.14847 11.0742V14.5195H0.703125C0.314789 14.5195 0 14.8343 0 15.2227C0 15.611 0.314789 15.9258 0.703125 15.9258H4.8516C5.03807 15.9258 5.21694 15.8517 5.34878 15.7198C5.48065 15.588 5.55472 15.4091 5.55472 15.2227L5.55469 11.7773H9.00004C9.1865 11.7773 9.36538 11.7033 9.49722 11.5714C9.62909 11.4396 9.70316 11.2607 9.70316 11.0742L9.70312 7.62891H13.1484C13.3349 7.62891 13.5138 7.55483 13.6456 7.42296C13.7775 7.29112 13.8516 7.11225 13.8516 6.92578L13.8515 3.48047H17.2969C17.6852 3.48047 18 3.16568 18 2.77734C18 2.38901 17.6852 2.07422 17.2969 2.07422Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </svg>
          </Box>
          Entrance ({name === 'origin' ? 'from' : 'to'})
        </Box>
      </Box>
      <FormControl sx={{ width: '100%' }}>
        <RadioGroup
          aria-labelledby={'floor-select-group-label' + name}
          {...field}
          {...rest}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            gap={{ xs: 'unset', sm: '4px' }}
          >
            <Box>
              <CustomLabel
                label="1"
                value={'1st/ground floor'}
                checked={val === '1st/ground floor'}
              />
            </Box>
            <Box>
              <CustomLabel
                label="2"
                value={'2nd floor'}
                checked={val === '2nd floor'}
              />
            </Box>

            <Box>
              <CustomLabel
                label="3"
                value="3rd floor"
                checked={val === '3rd floor'}
              />
            </Box>

            <Box>
              <CustomLabel
                label="4"
                value="4th floor"
                checked={val === '4th floor'}
              />
            </Box>

            <Box>
              <CustomLabel
                label="Elevator"
                value="elevator"
                checked={val === 'elevator'}
              />
            </Box>

            <Box>
              <CustomLabel
                label="House"
                value="house"
                checked={val === 'house'}
              />
            </Box>

            <Box>
              <CustomLabel
                label="Storage"
                value="storage"
                checked={val === 'storage'}
              />
            </Box>
          </Box>
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default FloorSelect;
