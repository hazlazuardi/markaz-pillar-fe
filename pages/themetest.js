import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './index'
import { Typography } from '@mui/material';
   
export default function BasicButtons(){
    return(
        <ThemeProvider theme={theme}>
            <Button 
            color="primary" 
            variant="contained">
             test
            </Button>
            <Typography 
                color="text">
                    test
                </Typography>
        </ThemeProvider>
    )
}
