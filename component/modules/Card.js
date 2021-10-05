import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '../../styles/Home.module.css';

export default function Card(props) {
    const {image, santri_name, desc} = props

    return (
        <Grid item sm={12} lg={3}>
            <Box
            sx={{
                width: "auto",
                height: 250,
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
            />
            <Grid container spacing={2} className={styles.textCenter}>
                <Grid item xs={12} mt={2}>
                    <Typography variant="h6">
                        {santri_name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2">
                        {desc}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Button variant="contained">Donasi</Button>
                </Grid>
                <Grid item xs={7}>
                    <Button variant="outlined">Lihat Detail</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}
