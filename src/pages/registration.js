import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAppContext } from '../context/AppContext';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { axiosMain } from '../axiosInstances';
import Image from 'next/image'
import RegistrationForm from '../component/modules/RegistrationForm';

export default function Registration() {
    const router = useRouter();

    const { state } = useAppContext();
    const { currentUser } = state;

    const [data, setData] = useState({
        "email": "",
        "username": "",
        "fullName": "",
        "password": "",
        "phoneNum": "",
        "address": ""
    });
    const [error, setError] = useState({
        status: null,
        email: "",
        username: "",
        fullName: "",
        password: "",
        phoneNum: "",
        address: ""
    })


    const registerUsingDefault = useCallback(async (data) => {
        return axiosMain.post("/register", data)
    }, [])

    useEffect(() => {
        if (currentUser) {
            router.push("/")
        }
    }, [router, currentUser])

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
                        variant='default'
                        apiCalls={registerUsingDefault}
                        data={data}
                        setData={setData}
                        error={error}
                        setError={setError}
                    />
                </Grid>
            </Grid>
        </>
    );
}
