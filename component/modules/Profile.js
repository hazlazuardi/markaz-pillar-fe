import React from 'react'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Profile(props) {
    const {name, desc, markaz, asal, gender, ttl, scholarship} = props

    const theme = useTheme();
    const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Grid item sm={12} lg={6} sx={{width: "100%"}}>
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} sx={{display: largeScreen? "block":"none"}}>
                    <Typography variant="h4" mb={5}>
                        {name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {desc}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="body1">Background</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Tempat Markaz</Typography>
                    <Typography variant="body2">{markaz}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Domisili Asal</Typography>
                    <Typography variant="body2">{asal}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Jenis Kelamin</Typography>
                    <Typography variant="body2">{gender}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Tempat & Tanggal Lahir</Typography>
                    <Typography variant="body2">{ttl}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Kebutuhan Beasiswa</Typography>
                    <Typography variant="body2">{scholarship}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}
