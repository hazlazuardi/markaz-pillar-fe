import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme'
import { Typography } from '@mui/material';
   
export default function BasicButtons(){
    return(
        <ThemeProvider theme={theme}>
            {/* <Button 
            color="primary" 
            variant="contained">
             test
            </Button> */}
            <Typography 
                variant="h2"
                color="textPrimary">
                    Primary Text Color
            </Typography><Typography 
                variant="h2"
                color="textSecondary">
                    Secondary Text Color
            </Typography>
            <br />
            <Typography 
                variant="h2"
                fontFamily="Poppins">
                    Poppins
            </Typography>
            <Typography 
                variant="h2"
                fontFamily="Poppins"
                fontWeight="Light">
                    Light
            </Typography>
            <Typography 
                variant="h2"
                fontFamily="Poppins"
                fontStyle="italic"
                color="textSecondary"
                fontWeight="Bold">
                    test
            </Typography>
        </ThemeProvider>
    )
}
