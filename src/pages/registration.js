import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { useAppContext } from '../context/AppContext';
import { dispatchTypes } from '../context/AppReducer';
import jwtDecode from 'jwt-decode';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Copyright from '../component/modules/Copyright';

import { FormHelperText, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { axiosMain } from '../axiosInstances';
import Image from 'next/image'

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

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
        // API Route usage

        await axiosMain
            .post("/register", data)
            .then(response => {
                console.log("regis res", response);
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
                console.log('regis error', e.response)
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

    console.log('error', error)
    useEffect(() => {
        if (currentUser) {
            router.push("/")
        }
    }, [router, currentUser])
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
                            Daftarkan diri anda
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Daftar dengan Google
                        </Button>
                        <Divider orientation="horizontal" flexItem>
                            atau
                        </Divider>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={handleChange}
                                value={data.email}
                                error={(error.email.length > 0 && data.email.length > 0) || (error.email.length > 0 && data.email.length === 0)}
                                helperText={(error.email && data.email.length > 0) && "Harap masukkan alamat email dengan benar" || (error.email && data.email.length === 0 && "Email harus diisi")}
                                placeholder="Hazmi@gmail.com"
                            />
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
                                name="fullName"
                                label="Nama Lengkap"
                                type="text"
                                id="fullName"
                                onChange={handleChange}
                                value={data.fullName}
                                error={(error.fullName.length > 0 && data.fullName.length > 0) || (error.fullName.length > 0 && data.fullName.length === 0)}
                                helperText={(error.fullName && data.fullName.length > 0) && "Harap masukkan nama lengkap dengan benar" || (error.fullName && data.fullName.length === 0 && "Nama Lengkap harus diisi")}
                                placeholder="Hazmi Al Munawaroh"
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
                                disabled={data.password.length < 8}
                            >
                                Daftar
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Sudah memiliki akun? Masuk"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
