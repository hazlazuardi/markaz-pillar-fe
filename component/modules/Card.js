import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import styles from '../../styles/Home.module.css';

export default function Card(props) {
    const {image, santri_name, desc} = props

    return (
        <Grid item>
            <Paper sx={{width: 300, height: 420}}>
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
                    <Grid item xs={12} sx={{ width: 300, height:50, overflow: "hidden", textOverflow: "ellipsis"}}>
                        <Typography
                            noWrap
                            p={1}
                        >
                            {desc}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display:"flex", justifyContent:"space-around" }}>
                        <Button variant="contained">Donasi</Button>
                        <Button variant="outlined">Lihat Detail</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}
