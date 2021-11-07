import React, { useState } from "react";
import Button from '@mui/material/Button'
import Container from "@mui/material/Container";
import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { useAppContext } from '../context/AppContext'
import { dispatchTypes } from '../context/AppReducer'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import styles from "../styles/Home.module.css";
import ActivityCard from "../component/modules/ActivityCard";

export default function Profile() {
    const { dispatch } = useAppContext();
    const router = useRouter();
    const [doAnimateHeight, setDoAnimateHeight] = useState(true)
    const [tabIndex, setTabIndex] = useState(0);


    const handleLogout = () => {
        localStorage.clear();
        dispatch({
            type: dispatchTypes.LOGOUT
        })
        router.push("/login")
    }

    const handleTabIndex = (event, tab) => {
        setTabIndex(tab);
        setDoAnimateHeight(false)
    };

    const handleChangeTabIndex = tab => {
        setTabIndex(tab);
        setDoAnimateHeight(false)
    };

    return (
        <Container maxWidth="lg" className={styles.container}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                mb={5}
            >

                <Grid item xs={12}>
                    <Box>
                        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                            <Avatar sx={{ width: 100, height: 100, mb: '1em' }}>{"Abimanyu"[0].toUpperCase()}</Avatar>
                        </Box>
                        <Typography sx={{ wordWrap: 'break-word' }} textAlign='center' variant='h5'>{"Abimanyu@gmail.com".split('@')[0]}</Typography>
                        <Typography sx={{ wordWrap: 'break-word' }} textAlign='center'>{"ROLE_USER".split('_')[1]}</Typography>
                        <Button fullWidth color='error' sx={{ mt: '2em' }} size='large' variant='text' onClick={handleLogout}>Keluar</Button>
                    </ Box>
                </Grid>

            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>
                        Kegiatan Saya <FilterAltOutlinedIcon/>
                    </Typography>
                </Grid>

                <Grid item xs={12} mt={2}>
                    <Box>
                    <Tabs
                        // value={value}
                        // onChange={handleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                    >
                        <Tab label="Semua Kegiatan" />
                        <Tab label="Donasi" />
                        <Tab label="Volunteer" />
                        <Tab label="Pengajar" />
                        <Tab label="Kelas" />
                    </Tabs>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item lg={6} xs={12}>
                            <ActivityCard/>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <ActivityCard/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} mt={5} sx={{display:"flex", justifyContent:"flex-end"}}>
                    <Pagination
                        count={5}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

