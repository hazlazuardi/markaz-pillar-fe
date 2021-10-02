import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Layout from "../component/layout"
import SearchBar from "../component/searchbar"
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from '../styles/Home.module.css';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { useState } from 'react';

export default function data_santri_all() {

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };
      
    const [value, setValue] = useState({
    "numOfEntries": 10,
    });

    const [error, setError] = useState({
    "status": 201,
    "statusText": ""
    })

    return (
        <Layout>
            <Container maxWidth="lg" className={styles.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <Typography variant="h6" component="h2">
                        Daftar Santri <FilterAltOutlinedIcon/>
                    </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant="subtitle1" component="subtitle1">
                        Show
                        <FormControl sx={{ m: 1}}>
                            <Select
                            value={value.numOfEntries}
                            onChange={handleChange}
                            displayEmpty
                            name="numOfEntries"
                            inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            </Select>

                        </FormControl>
                        Entries
                    </Typography>
                    </Grid>
                    <Grid item xs={6} className={styles.flexEnd} pr={2}>
                        <SearchBar></SearchBar>
                    </Grid>
                    <Grid item xs={3}>
                        <Box
                        sx={{
                            width: 250,
                            height: 250,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        />
                        <Grid container spacing={2} className={styles.textCenter}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h6" component="subtitle1">
                                    Santri 1
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="subtitle2">
                                    jenky sangat waw, molly ingin makan
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
                    <Grid item xs={3}>
                        <Box
                        sx={{
                            width: 250,
                            height: 250,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        />
                        <Grid container spacing={2} className={styles.textCenter}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h6" component="subtitle1">
                                    Santri 2
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="subtitle2">
                                    jenky sangat waw, molly ingin makan
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
                    <Grid item xs={3}>
                        <Box
                        sx={{
                            width: 250,
                            height: 250,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        />
                        <Grid container spacing={2} className={styles.textCenter}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h6" component="subtitle1">
                                    Santri 3
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="subtitle2">
                                    jenky sangat waw, molly ingin makan
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
                    <Grid item xs={3}>
                        <Box
                        sx={{
                            width: 250,
                            height: 250,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        />
                        <Grid container spacing={2} className={styles.textCenter}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h6" component="subtitle1">
                                    Santri 4
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="subtitle2">
                                    jenky sangat waw, molly ingin makan
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
                    <Grid item xs={3}>
                        <Box
                        sx={{
                            width: 250,
                            height: 250,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        />
                        <Grid container spacing={2} className={styles.textCenter}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h6" component="subtitle1">
                                    Santri 5
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="subtitle2">
                                    jenky sangat waw, molly ingin makan
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
                    <Grid item xs={3}>
                        <Box
                        sx={{
                            width: 250,
                            height: 250,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        />
                        <Grid container spacing={2} className={styles.textCenter}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h6" component="subtitle1">
                                    Santri 6
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="subtitle2">
                                    jenky sangat waw, molly ingin makan
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
                    <Grid item xs={3}>
                        <Box
                        sx={{
                            width: 250,
                            height: 250,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        />
                        <Grid container spacing={2} className={styles.textCenter}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h6" component="subtitle1">
                                    Santri 7
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="subtitle2">
                                    jenky sangat waw, molly ingin makan
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
                    <Grid item xs={3}>
                        <Box
                        sx={{
                            width: 250,
                            height: 250,
                            bgcolor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                        />
                        <Grid container spacing={2} className={styles.textCenter}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h6" component="subtitle1">
                                    Santri 8
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" component="subtitle2">
                                    jenky sangat waw, molly ingin makan
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
                    <Grid item xs={12} mt={5} className={styles.flexEnd}>
                        <Pagination count={5} />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}
