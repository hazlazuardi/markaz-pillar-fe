import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { Copyright } from '../../modules/Copyright';


const theme = createTheme();

export default function RegistrationTemplate(props) {
  const { value, error, handleChange, handleSubmit } = props;
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
                  error={error.status !== 201 && value !== ""}
                  helperText={error.status !== 201 && value !== "" && "Email yang anda masukkan sudah ada"}
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
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={handleChange}
                  value={value.password}
                  error={value.password.length < 8}
                  helperText={value.password.length < 8 && "Password harus terdiri dari 8 karakter"}
                />
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
      </ThemeProvider>
    </div>
  );
}
