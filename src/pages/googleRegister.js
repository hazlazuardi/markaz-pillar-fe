import { useCallback, useMemo, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { axiosMain } from '../axiosInstances';
import Image from 'next/image'
import Cookies from 'universal-cookie';
import RegistrationForm from '../component/modules/RegistrationForm';
import { useAppContext } from "../context/AppContext";
import { dispatchTypes } from "../context/AppReducer";
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';



export default function GoogleRegister() {
    const cookies = useMemo(() => new Cookies(), [])
    const { dispatch } = useAppContext();
    const router = useRouter()

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
        .then(response => {
            cookies.remove('state')
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
            router.replace("/")
        }).catch(e => {
            console.log(e)
            dispatch({
                type: dispatchTypes.REGISTRATION_FAIL,
                payload: {
                    message: "All fields must not be blank"
                }
            })
        })
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
                        apiCall={registerUsingOAuth}
                    />
                </Grid>
            </Grid>
        </>
    )
}
