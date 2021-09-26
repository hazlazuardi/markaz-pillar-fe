import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';


const BASE_URL = process.env.BACKEND_HOST;

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function login() {
  const router = useRouter();

  const [value, setValue] = useState({
    "email": "",
    "username": "",
    "fullName": "",
    "password": "",
    "phoneNum": "",
    "address": ""
  });
  const [error, setError] = useState({
    "status": 201,
    "statusText": ""
  })

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setValue((prev) => ({
        ...prev,
        [name]: value
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`http://localhost:8080/authenticate`, {
        body: JSON.stringify(value),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
        .then(response => {
            if (response.status === 201) {
                console.log("Logged In", response)
                setError({
                    "status": 201,
                    "statusText": ""
                })
                router.push("/landing")
            } else {
                console.log("Error", response.status)
                setError({
                    "status": response.status,
                    "statusText": response.statusText
                })
            }
        })
        .catch(error => {
            console.log(error)
        })
};

    return (
        <div>
            <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
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
              Masuk ke akun anda
            </Typography>
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Masuk dengan Google
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
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                value={value.email}
                error={error.status !== 201 && value !== ""}
                helperText={error.status !== 201 && value !== "" && "Email belum terdaftar"}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={value.password}
                error={error.status !== 201 && value !== ""}
                helperText={error.status !== 201 && value !== "" && "Password dan email tidak cocok"}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Belum memiliki akun? Registrasi"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
        </div>
    );
}
