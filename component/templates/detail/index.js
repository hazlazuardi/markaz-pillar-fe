import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from '../../../styles/Home.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

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

    return (
        <div>
        <Container maxWidth="lg" className={styles.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} mb={8}>
                    <Typography variant="body1">
                        <ArrowBackIcon/> Santri 1
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                <Grid container spacing={3} mb={3}>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h4" mb={6}>
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
                            <Typography variant="body1">Tempat Markaz</Typography>
                            <Typography variant="body2">Blok M</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">Domisili Asal</Typography>
                            <Typography variant="body2">Blok M</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">Jenis Kelamin</Typography>
                            <Typography variant="body2">Blok M</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">Tempat & Tanggal Lahir</Typography>
                            <Typography variant="body2">Blok M</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Kebutuhan Beasiswa</Typography>
                            <Typography variant="body2">Blok M</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                <Box
                    sx={{
                        width: 450,
                        height: 450,
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    m={2}
                    />

                    <Typography variant="body2" m={2}>
                        NOMINAL YANG DIBUTUHKAN
                    </Typography>

                    <Box sx={{textAlign: "center", width :450}} m={2}>
                        <Typography variant="body2" m={2}>
                            50.000/100.000
                        </Typography>
                        <BorderLinearProgress variant="determinate" value={50} />
                    </Box>
                    <Box sx={{textAlign: "center", width :450}}>
                        <Button variant="contained">Donasi Sekarang</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <Grid container spacing={2} sx={{backgroundColor:"lightgray"}} mt={2}>
            <Container maxWidth="lg" className={styles.container}>
                <Typography variant="body2">PROGRESS DONASI</Typography>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={4}>
                        <Box 
                        sx={{
                            width: 300,
                            height: 300,
                            border: '1px solid gray'
                        }}
                        p={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        backgroundImage: 'url(https://source.unsplash.com/random)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundColor: (t) =>
                                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    />
                                    <Typography>Tanggal</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Deskripsi Kemajuan</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box 
                        sx={{
                            width: 300,
                            height: 300,
                            border: '1px solid gray'
                        }}
                        p={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        backgroundImage: 'url(https://source.unsplash.com/random)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundColor: (t) =>
                                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    />
                                    <Typography>Tanggal</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Deskripsi Kemajuan</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box 
                        sx={{
                            width: 300,
                            height: 300,
                            border: '1px solid gray'
                        }}
                        p={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box
                                    sx={{
                                        width: 50,
                                        height: 50,
                                        backgroundImage: 'url(https://source.unsplash.com/random)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundColor: (t) =>
                                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                    />
                                    <Typography>Tanggal</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>Deskripsi Kemajuan</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
        </div>
    )
}
