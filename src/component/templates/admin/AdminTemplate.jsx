import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import styles from '../../../styles/Home.module.css';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;
export default function AdminTemplate(props) {
    const {children, searchBarName, markazOrSantri, view1, view2, add} = props;
      
    const [value, setValue] = useState(10);

    const [page, setPage] = useState(0)

    const [searchTerm, setSearchTerm] = useState("")


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
                        value={value}
                        onChange={e => {
                            setSearchTerm("")
                            setValue(e.target.value)
                        }}
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
                        <Grid item xs={8} align='Right'>
                            <form action="/" method="get">
                                <label htmlFor="header-search">
                                    <span className="visually-hidden"></span>
                                </label>
                                <input
                                    type="text"
                                    id="header-search"
                                    placeholder={searchBarName}
                                    name="s"
                                    className="search"
                                    value={searchTerm}
                                    onChange={(event) => {setSearchTerm(event.target.value)}}
                                />
                                <button type="submit" className={styles.btn2}>
                                    Cari
                                </button>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                        
                {children}
                <Grid item className={styles.flexEnd}>
                    {add}
                </Grid>
                <Grid item xs={12} mt={5} className={styles.flexEnd}>
                    <Pagination count={5} page={page + 1} onChange={(event, vvalue) => {
                            setSearchTerm("")
                            setPage(vvalue-1)}
                        }/>
                </Grid>
            </Grid>
        </Container>
    )
}
