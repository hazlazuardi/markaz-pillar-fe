import React, { useState, useEffect } from "react";
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
import { axiosMain } from '../axiosInstances'
import useSWR from "swr";
import Link from 'next/link'

const fetcher = url => axiosMain.get(url).then(res => res.data)

export default function Profile() {

    const { state, dispatch } = useAppContext();
    const { currentUser, currentUserRole } = state;
    const router = useRouter();
    const [tabIndex, setTabIndex] = useState(0);
    const [activities, setActivities] = useState([])

    const { data } = useSWR(`/user/activity?page=0&n=10`, fetcher)

    const handleLogout = () => {
        localStorage.clear();
        dispatch({
            type: dispatchTypes.LOGOUT
        })
        router.push("/login")
    }

    const handleTabIndex = (event, tab) => {
        setTabIndex(tab);
    };

    useEffect(() => {        
        if (data != null)
            setActivities(data.result)
    }, [data])

    const allActivities = activities.length != 0 ? activities.map(activity => {
        if(activity.type == "TRANSACTION") {
            return (<ActivityCard
                type={"Donasi"}
                name={activity.data.targetName}
                status={activity.data.status}
                date={activity.createdAt}
                secInfo={activity.data.amount}
                recipientType={activity.data.targetType}
                key={activity.id}
                targetId={activity.targetId}
            />)
        } else {
            return (<ActivityCard
                type={"Volunteer"}
                name={activity.data.program.name}
                status={activity.data.status}
                date={activity.createdAt}
                secInfo={activity.data.program.location}
                recipientType={"volunteer"}
                key={activity.id}
                targetId={activity.targetId}
            />)
        }
    })
        : <Grid item lg={6} xs={12}>
            <Typography>No activities yet</Typography>
        </Grid>

    const donations = activities.length != 0 ? 
        activities.filter(activity => activity.type == "TRANSACTION")
            .map(activity => (
            <ActivityCard
                type={"Donasi"}
                name={activity.data.targetName}
                status={activity.data.status}
                date={activity.createdAt}
                secInfo={activity.data.amount}
                recipientType={activity.data.targetType}
                key={activity.id}
                targetId={activity.targetId}
            />
        ))
        : <Grid item lg={6} xs={12}>
            <Typography>No activities yet</Typography>
        </Grid>

    const volunteers = activities.length != 0 ? 
    activities.filter(activity => activity.type == "VOLUNTEER")
        .map(activity => (
        <ActivityCard
            type={"Volunteer"}
            name={activity.data.program.name}
            status={activity.data.status}
            date={activity.createdAt}
            secInfo={activity.data.program.location}
            recipientType={"volunteer"}
            key={activity.id}
            targetId={activity.targetId}
        />
    ))
    : <Grid item lg={6} xs={12}>
        <Typography>No activities yet</Typography>
    </Grid>
    
    const showData = () => {
        if(tabIndex == 0) {
            return allActivities
        } else if (tabIndex == 1){
            return donations
        } else if (tabIndex == 2){
            return volunteers
        } else {
            "No activities yet"
        }
    }

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
                    {currentUser && (
                        <Box>
                            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                                <Avatar sx={{ width: 100, height: 100, mb: '1em' }}>{currentUser[0].toUpperCase()}</Avatar>
                            </Box>
                            <Typography sx={{ wordWrap: 'break-word' }} textAlign='center' variant='h5'>{currentUser.split('@')[0]}</Typography>
                            <Typography sx={{ wordWrap: 'break-word' }} textAlign='center'>{currentUserRole.split('_')[1]}</Typography>
                            <Button fullWidth color='error' sx={{ mt: '2em' }} size='large' variant='text' onClick={handleLogout}>Keluar</Button>
                        </ Box>
                    )}

                    {!currentUser && (
                        <Box>
                            <Typography sx={{ wordWrap: 'break-word', margin: 1 }} textAlign='center'>Anda Belum Log In</Typography>
                            <Link href='/login' passHref>
                                <Button fullWidth sx={{ mb: '1em' }} variant="contained" color="primary" size='large'>
                                    Masuk
                                </Button>
                            </Link>
                            <Link href='/registration' passHref>
                                <Button fullWidth variant="outlined" color="primary" size='large'>
                                    Daftar
                                </Button>
                            </Link>
                        </ Box>
                    )}
                </Grid>

            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>
                        Kegiatan Saya <FilterAltOutlinedIcon />
                    </Typography>
                </Grid>

                <Grid item xs={12} mt={2}>
                    <Box>
                        <Tabs
                            value={tabIndex}
                            onChange={handleTabIndex}
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                        >
                            <Tab label="Semua Kegiatan" value={0} />
                            <Tab label="Donasi" value={1} />
                            <Tab label="Volunteer" value={2} />
                            <Tab label="Pengajar" value={3} />
                            <Tab label="Kelas" value={4} />
                        </Tabs>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        { showData() }
                    </Grid>
                </Grid>

                <Grid item xs={12} mt={5} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Pagination
                        count={5}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}

