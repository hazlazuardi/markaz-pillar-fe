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
import { dispatchTypes } from '../context/AppReducer';
import jwtDecode from 'jwt-decode';

export default function Registration() {
    const router = useRouter();

    const { state, dispatch } = useAppContext();
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

    const [loading, setLoading] = useState(false)

    const registerUsingDefault = useCallback(async (data) => {
        return axiosMain.post("/register", data)
        .then(response => {
            setLoading(false)
            const decodedJWT = jwtDecode(response.data.result.accessToken)
            dispatch({
                type: dispatchTypes.REGISTRATION_SUCCEED,
                payload: {
                    currentUser: decodedJWT.sub,
                    currentUserRole: decodedJWT.role,
                    currentAccessToken: response.data.result.accessToken,
                    currentRefreshToken: response.data.result.refreshToken
                }
            });

        })
        .catch(e => {
            setLoading(false)
            dispatch({
                type: dispatchTypes.REGISTRATION_FAIL,
                payload: {
                    message: "Alamat email sudah digunakan"
                }
            })
        })
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
                        apiCall={registerUsingDefault}
                        data={data}
                        setData={setData}
                        error={error}
                        setError={setError}
                        loading={loading}
                        setLoading={setLoading}
                    />
                </Grid>
            </Grid>
        </>
    );
}
