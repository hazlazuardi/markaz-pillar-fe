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
      button: {
        textTransform: 'capitalize'
      },
      displayLg: {
        fontSize: '3.565rem',
        fontFamily: "'Playfair Display', serif;"
      },
      displayMd: {
        fontSize: '2.812rem',
        fontFamily: "'Poppins', sans-serif;"
      },
      displaySm: {
        fontSize: '2.25rem',
        fontFamily: "'Playfair Display', serif;"
      },
      headlineLg: {
        fontSize: '2rem',
        fontFamily: "'Poppins', sans-serif;"
      },
// Dear Kevin,
// Please put the rest of the Typography styles from Figma below
// TODO
    },
    link: {
      fontFamily: "'Poppins', 'Helvetica'",
      fontWeightLight: 200,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 800,
    }
  });