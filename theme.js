import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#004f5d',
      },
      secondary: {
        main: '#c2842b',
      },
      
      text: {
        primary: '#000000',
        secondary: '#737B7D'
      }
    },
    typography: {
      fontFamily: "'Poppins','Helvetica'",
      fontWeightLight: 200,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 800,
    }
  });