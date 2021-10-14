import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Copyright from '../../modules/Copyright';

import { FormHelperText, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme();

export default function RegistrationTemplate(props) {
  const { validateForm, value, error, handleChange, handleSubmit } = props;

  const [show, setShow] = useState(false)
  const handleClickShowPassword = () => {
    setShow(!show)
  };

  return (
    <div>
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
                value={value.email}
                error={(error.email.length > 0 && value.email.length > 0) || (error.email.length > 0 && value.email.length === 0)}
                helperText={(error.email && value.email.length > 0) && "Harap masukkan alamat email dengan benar"|| (error.email && value.email.length === 0 && "Email harus diisi")}
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
                value={value.username}
                error={(error.username.length > 0 && value.username.length > 0) || (error.username.length > 0 && value.username.length === 0)}
                helperText={(error.username && value.username.length > 0) && "Harap masukkan username dengan benar"|| (error.username && value.username.length === 0 && "Username harus diisi")}
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
                value={value.fullName}
                error={(error.fullName.length > 0 && value.fullName.length > 0) || (error.fullName.length > 0 && value.fullName.length === 0)}
                helperText={(error.fullName && value.fullName.length > 0) && "Harap masukkan nama lengkap dengan benar"|| (error.fullName && value.fullName.length === 0 && "Nama Lengkap harus diisi")}
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
                value={value.phoneNum}
                error={(error.phoneNum.length > 0 && value.phoneNum.length > 0) || (error.phoneNum.length > 0 && value.phoneNum.length === 0)}
                helperText={(error.phoneNum && value.phoneNum.length > 0) && "Harap masukkan nomor telpon dengan benar"|| (error.phoneNum && value.phoneNum.length === 0 && "Nomor Telpon harus diisi")}
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
                value={value.address}
                error={(error.address.length > 0 && value.address.length > 0) || (error.address.length > 0 && value.address.length === 0)}
                helperText={(error.address && value.address.length > 0) && "Please input a valid address"|| (error.address && value.address.length === 0 && "Alamat harus diisi")}
                placeholder="Malang, Jawa Timur"
              />
              <FormControl
                fullWidth margin="normal" variant="outlined"
                required
                error={value.password.length > 0 && value.password.length < 8}
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={show ? 'text' : 'password'}
                  name="password"
                  value={value.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
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
                {value.password.length > 0 && value.password.length < 8 &&
                  <FormHelperText>
                    Password harus minimal terdiri dari 8 karakter
                  </FormHelperText>
                }
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={value.password.length < 8}
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
    </div>
  );
}
