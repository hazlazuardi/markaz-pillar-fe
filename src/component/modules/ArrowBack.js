import React from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function ArrowBack(props) {
    const {name} = props

    const theme = useTheme();
    const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    return (
        <Grid item sm={12} lg={12} mb={8} sx={{display: largeScreen? "block":"none"}}>
            <Typography variant="body1" sx={{textTransform : "capitalize"}}>
                <ArrowBackIcon/> {name}
            </Typography>
        </Grid>
    )
}
