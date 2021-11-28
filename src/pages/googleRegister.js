import { useCallback, useMemo, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { axiosMain } from '../axiosInstances';
import Image from 'next/image'
import Cookies from 'universal-cookie';
import RegistrationForm from '../component/modules/RegistrationForm';



export default function GoogleRegister() {
    const cookies = useMemo(() => new Cookies(), [])

    const [data, setData] = useState({
        "username": "",
        "email": cookies.get('email'),
        "fullName": cookies.get('fullName'),
        "phoneNum": "",
        "address": "",
        "password": ""
    });

    const [error, setError] = useState({
        status: null,
        username: "",
        phoneNum: "",
        address: "",
        password: "",
    })


    const registerUsingOAuth = useCallback(async (data) => {
        return axiosMain.post(`oauth/create?state=${cookies.get("state")}`, data)
    }, [cookies])

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                >
                    <Box sx={{ position: 'relative', width: '100%', height: '100%', zIndex: '-100' }}
                    >
                        <Image src='https://source.unsplash.com/random' layout='fill'
                            objectFit='cover' alt='Backdrop' />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
                    <RegistrationForm
                        variant='oauth'
                        data={data}
                        setData={setData}
                        error={error}
                        setError={setError}
                        apiCalls={registerUsingOAuth}
                    />
                </Grid>
            </Grid>
        </>
    )
}
