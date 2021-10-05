import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from '../../../styles/Home.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { makeStyles } from '@material-ui/core';

import { styled } from '@mui/material/styles';

export default function index({children}) {

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
      }));

      const useStyles = makeStyles(theme => ({
        imgSize : {
            width: "auto",
            height: 300,
            [theme.breakpoints.up('lg')]: {
                width: "auto",
                height: 450,
            },
        }
      }));

      const classes = useStyles();

    return (
        <div>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Container maxWidth="lg" className={styles.container}>
                    <Grid container spacing={3}>
                        <Grid item sm={12} lg={12} mb={8}>
                            <Typography variant="body1">
                                <ArrowBackIcon/> Santri 1
                            </Typography>
                        </Grid>
                        <Grid item sm={12} lg={6}>
                            <Grid container spacing={3} mb={3}>
                                <Grid item xs={12}>
                                    <Typography variant="h4" mb={5}>
                                        Santri 1
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        Hello, My name is Abimanyu, I'm 20 years old, Currently studying computer
                                        science in my 5th semester. Ich spreche Indonesisch, English, und einbisschen Deutsch
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Background</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Tempat Markaz</Typography>
                                    <Typography variant="body2">Blok M</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Domisili Asal</Typography>
                                    <Typography variant="body2">Blok M</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Jenis Kelamin</Typography>
                                    <Typography variant="body2">Blok M</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Tempat & Tanggal Lahir</Typography>
                                    <Typography variant="body2">Blok M</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1"><LocalShippingOutlinedIcon/> Kebutuhan Beasiswa</Typography>
                                    <Typography variant="body2">Blok M</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item sm={12} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <Grid item sm={12}>
                                        <Box
                                            className={classes.imgSize}
                                            sx={{
                                                backgroundImage: 'url(https://source.unsplash.com/random)',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundColor: (t) =>
                                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }} mb={1}
                                        />
                                    </Grid>
                                    <Grid item sm={12} sx={{textAlign:"center"}}>
                                        <Typography variant="body2" mb={1}>
                                            NOMINAL YANG DIBUTUHKAN
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} mb={1} sx={{textAlign:"center"}}>
                                        <Typography variant="body2" mb={1}>
                                            50.000/100.000
                                        </Typography>
                                        <BorderLinearProgress variant="determinate" value={50} />
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Box sx={{textAlign: "center", width : "auto"}}>
                                            <Button variant="contained">Donasi Sekarang</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid> 
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
        <Grid item xs={12} sx={{backgroundColor:"lightgray"}}>
            <Container maxWidth="lg">
                <Typography variant="body2" mb={2}>PROGRESS DONASI</Typography>
                <Grid container spacing={2} sx={{display: "flex", justifyContent: "center"}}>
                    <Grid item sm={12} lg={4}>
                    <Box  sx={{
                        width: 300,
                        height: 300,
                        border: '1px solid gray',
                        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'
                    }}>
                        <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                            <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' }}>
                            <Box
                            sx={{
                                width: 60,
                                height: 60,
                                backgroundImage: 'url(https://source.unsplash.com/random)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            mb={2}
                            /> 
                            <Typography>Tanggal</Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                            Description of the donation
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                    <Box  sx={{
                        width: 300,
                        height: 300,
                        border: '1px solid gray',
                        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'
                    }}>
                        <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                            <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' }}>
                            <Box
                            sx={{
                                width: 60,
                                height: 60,
                                backgroundImage: 'url(https://source.unsplash.com/random)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            mb={2}
                            /> 
                            <Typography>Tanggal</Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                            Description of the donation
                        </Box>
                    </Box>
                    </Grid>
                    <Grid item sm={12} lg={4}>
                    <Box  sx={{
                        width: 300,
                        height: 300,
                        border: '1px solid gray',
                        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'
                    }}>
                        <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                            <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' }}>
                            <Box
                            sx={{
                                width: 60,
                                height: 60,
                                backgroundImage: 'url(https://source.unsplash.com/random)',
                                backgroundRepeat: 'no-repeat',
                                backgroundColor: (t) =>
                                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                            mb={2}
                            /> 
                            <Typography>Tanggal</Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                            Description of the donation
                        </Box>
                    </Box>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
        </div>
    )
}
