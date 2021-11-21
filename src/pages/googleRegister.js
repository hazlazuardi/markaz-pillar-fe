import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { dispatchTypes } from '../context/AppReducer';
import jwtDecode from 'jwt-decode';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Copyright from '../component/modules/Copyright';

import { FormHelperText, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { axiosMain } from '../axiosInstances';
import Image from 'next/image'
import Cookies from 'universal-cookie';


export default function GoogleRegister() {
    const cookies = new Cookies()
    const { dispatch } = useAppContext();

    const [data, setData] = useState({
        "username": "",
        "email" : cookies.get('email'),
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

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError((prev => ({
            ...prev,
            [name]: ""
        })))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        await axiosMain
            .post(`oauth/create?state=${cookies.get("state")}`, data)
            .then(response => {
                setLoading(false)
                console.log(response)
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

            })
            .catch(e => {
                setLoading(false)
                
                setError(prev => ({
                    ...prev,
                    ...e.response.data.result
                }))
                if (e.response.data.result.message) {
                    dispatch({
                        type: dispatchTypes.REGISTRATION_FAIL,
                        payload: {
                            message: "Alamat email sudah digunakan"
                        }
                    })
                }

            })
    }

    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState(false)
    const handleClickShowPassword = () => {
        setShow(!show)
    };

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
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Daftar dengan Google
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="username"
                                label="Username"
                                type="text"
                                id="username"
                                onChange={handleChange}
                                value={data.username}
                                error={(error.username.length > 0 && data.username.length > 0) || (error.username.length > 0 && data.username.length === 0)}
                                helperText={(error.username && data.username.length > 0) && "Harap masukkan username dengan benar" || (error.username && data.username.length === 0 && "Username harus diisi")}
                                placeholder="hazmi132"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="phoneNum"
                                label="Nomor Telpon"
                                type="tel"
                                id="phoneNum"
                                onChange={handleChange}
                                value={data.phoneNum}
                                error={(error.phoneNum.length > 0 && data.phoneNum.length > 0) || (error.phoneNum.length > 0 && data.phoneNum.length === 0)}
                                helperText={(error.phoneNum && data.phoneNum.length > 0) && "Harap masukkan nomor telpon dengan benar" || (error.phoneNum && data.phoneNum.length === 0 && "Nomor Telpon harus diisi")}
                                placeholder="0811132847"

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                label="Alamat"
                                type="text"
                                id="address"
                                onChange={handleChange}
                                value={data.address}
                                error={(error.address.length > 0 && data.address.length > 0) || (error.address.length > 0 && data.address.length === 0)}
                                helperText={(error.address && data.address.length > 0) && "Please input a valid address" || (error.address && data.address.length === 0 && "Alamat harus diisi")}
                                placeholder="Malang, Jawa Timur"
                            />
                            <FormControl
                                fullWidth margin="normal" variant="outlined"
                                required
                                error={data.password.length > 0 && data.password.length < 8}
                            >
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={show ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                id='togglePasswordAtRegistration'
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {show ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    placeholder="Pass1234"

                                />
                                {data.password.length > 0 && data.password.length < 8 &&
                                    <FormHelperText>
                                        Password harus minimal terdiri dari 8 karakter
                                    </FormHelperText>
                                }
                            </FormControl>
                            <Button
                                id='submitAtRegistration'
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={data.password.length < 8 || loading}
                            >
                                Lanjutkan
                            </Button>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
