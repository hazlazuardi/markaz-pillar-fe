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

import { useState } from 'react';

export default function ShowAll(props) {

<<<<<<< HEAD:component/templates/show_all/ShowAll.js
    const {children, searchBarName} = props;
=======
    const {children, searchBarName, markazOrSantri} = props;
>>>>>>> c4be19b9744cb19c76febc2dfcbc7a42c0c6c2f3:src/component/templates/show_all/ShowAll.js

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
                <Grid item lg={6} sm={12}>
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
                <Grid item lg={6} sm={12} className={styles.flexEnd} pr={2}>
                    <SearchBar searchName = {searchBarName}></SearchBar>
                </Grid>
                {children}
                <Grid item xs={12} mt={5} className={styles.flexEnd}>
                    <Pagination count={5} />
                </Grid>
            </Grid>
        </Container>
    )
}
