import React from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SearchBar from '../../searchbar';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styles from '../../../styles/Home.module.css';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Button from '@mui/material/Button';


import { useState } from 'react';

export default function ShowAll(props) {

    const {children, searchBarName, markazOrSantri, view1, view2} = props;

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
        <Container maxWidth="lg" className={styles.container}>
            <Grid container spacing={3} sx={{display: 'flex', justifyContent:"center"}}>
                <Grid item xs={12}>
                <Typography variant="h6" component="h2">
                    Daftar {markazOrSantri} <FilterAltOutlinedIcon/>
                </Typography>
                </Grid>
                <Grid item align='Left' lg={12} sm={12}>
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
                <Grid item lg={12} sm={12} className={styles.flexing} pr={2}>
                    <Grid container spacing={0}>
                        {/* <Grid item xs={2}><Button>{view1}</Button></Grid> */}
                        {/* <Grid item xs={2}><Button>{view2}</Button></Grid> */}
                        {view1}
                        {view2}
                        <Grid item xs={8} align='Right'><SearchBar className={styles.flexing_search} searchName = {searchBarName}></SearchBar></Grid>
                    </Grid>
                </Grid>
                {children}
                <Grid item xs={12} mt={5} className={styles.flexEnd}>
                    <Pagination count={5} />
                </Grid>
            </Grid>
        </Container>
    )
}
