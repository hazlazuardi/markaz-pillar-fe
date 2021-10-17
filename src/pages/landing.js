import { useTheme } from '@mui/material/styles';
import styles from '../styles/Home.module.css';
import Layout from "../component/layout";
import Link from 'next/link';
import { makeStyles } from '@mui/styles';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from "../theme"
import { ThemeProvider } from '@material-ui/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "7%",
    textAlign: "left",
    width: "100%",
  },
  contentCenter: {
    padding: "7%",
    textAlign: "center",
  },
  bg: {
    backgroundColor: "#f1f4f5"
  },
  sub: {
    color: "#004F5D"
  },
  heading: {
    fontSize: "200%",
    padding: "7%",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#004F5D",
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  pad1: {
      padding: "3%",
    },
  email: {
    textAlign: "center",
},
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
  <ThemeProvider theme={theme}>
      <div className={classes.bg}>
      <div className={classes.pad1}>
        <Grid container spacing={0}>
          <Grid item xs={10} sm={6} md={6} className={classes.heading}
          sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            />
          <Grid item xs={12} sm={6} md={6} className={classes.content}>
            <Typography>
            <b className={classes.sub}>
                TENTANG KAMI<br/><br/>
            </b>
            </Typography>
            <Typography component="h2" variant="h5">Markaz Pilar</Typography><br/>
            <Typography>
            Markaz Pilar adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Neque, mauris purus nulla fermentum scelerisque pharetra feugiat.
            Nisl mi maecenas ut et iaculis. Eget lacus, sapien adipiscing in id nam.
            Phasellus purus amet consectetur id ultricies aliquam sed magna habitant.
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={0} direction={largeScreen? "row":"column-reverse"}>
          <Grid item xs>
            <Typography className={classes.contentCenter}>
                <Grid item
                  sx={{
                      backgroundImage: 'url(https://source.unsplash.com/random)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100px',
                      height: '100px',
                      marginLeft: '37%',
                      marginBottom: '5%'
                    }}
                    />
                <b className={classes.sub}>
                TENTANG KAMI
                </b><br/>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.<br/><br/>
                <Button variant="contained" className={classes.btn}>Donasi Sekarang</Button>
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography className={classes.contentCenter}>
                <Grid item
                  sx={{
                      backgroundImage: 'url(https://source.unsplash.com/random)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100px',
                      height: '100px',
                      marginLeft: '37%',
                      marginBottom: '5%'
                    }}
                    />
                <b className={classes.sub}>
                TENTANG KAMI
                </b><br/>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.<br/><br/>
                <Button variant="contained" className={classes.btn}>Lihat Markaz</Button>
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography className={classes.contentCenter}>
                <Grid item
                  sx={{
                      backgroundImage: 'url(https://source.unsplash.com/random)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100px',
                      height: '100px',
                      marginLeft: '37%',
                      marginBottom: '5%'
                    }}
                    />
                <b className={classes.sub}>
                TENTANG KAMI
                </b><br/>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.<br/><br/>
                <Button variant="contained" className={classes.btn}>Lihat Santri</Button>
            </Typography>
          </Grid>
        </Grid>
      </div>
      </div>
        <Grid container spacing={0} direction={largeScreen? "row":"column-reverse"}>
          <Grid item xs className={classes.content}>
            <Typography>
            <b className={classes.sub}>
                PROGRAM UNTUK MASYARAKAT
            </b>
            </Typography>
            <br/>
            <Typography component="h2" variant="h5">Ikuti berbagai kelas di Markaz Pilar!</Typography><br/>
            <Typography>Daftarkan diri anda untuk mengikuti berbagai kelas yang akan dipandu oleh para ahli dibidangnya.</Typography>
              <br/>
              <Typography>
              <Grid container spacing={5}>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>KELAS HADIST</b><br/>
                      </div>
                      Pengajar: Muhammad Adam, S.Pd.I.<br/>
                      Lokasi: Masjid UI Depok<br/>
                      Jadwal: Senin, 13.00-14.00<br/>
                      <div className={classes.sub}>
                      <br/>
                        <b>Lihat program lain →</b><br/>
                      </div>
                  </Grid>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>KELAS HADIST</b><br/>
                      </div>
                      Pengajar: Muhammad Adam, S.Pd.I.<br/>
                      Lokasi: Masjid UI Depok<br/>
                      Jadwal: Senin, 13.00-14.00
                  </Grid>
              </Grid>
              </Typography>
          </Grid>
          <Grid item xs className={classes.heading}
          sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            />
        </Grid>

        <Grid container spacing={0} direction={largeScreen? "row":"column-reverse"}>
          <Grid item xs className={classes.heading}
          sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            />
          <Grid item xs className={classes.content}>
          <Typography>
             <Typography component="h2" variant="h5">Daftarkan diri anda sebagai pengajar di berbagai kelas!</Typography><br/>
             <Typography>Kami juga membutuhkan lulusan santri yang dapat membantu kami memandu kelas untuk santri tahfidz.</Typography>
              <br/>
              <Grid container spacing={5}>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>KELAS HADIST</b><br/>
                      </div>
                      Pengajar: Muhammad Adam, S.Pd.I.<br/>
                      Lokasi: Masjid UI Depok<br/>
                      Jadwal: Senin, 13.00-14.00<br/>
                      <div className={classes.sub}>
                      <br/>
                        <b>Lihat program lain →</b><br/>
                      </div>
                  </Grid>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>KELAS HADIST</b><br/>
                      </div>
                      Pengajar: Muhammad Adam, S.Pd.I.<br/>
                      Lokasi: Masjid UI Depok<br/>
                      Jadwal: Senin, 13.00-14.00
                  </Grid>
              </Grid>
              </Typography>
          </Grid>
        </Grid>

    <div className={classes.bg}>
        <Grid container spacing={0} direction={largeScreen? "row":"column-reverse"}>
          <Grid item xs className={classes.content}>
            <Typography>
            <b className={classes.sub}>
                PROGRAM UNTUK SANTRI TAHFIDZ
            </b>
            </Typography>
            <br/>
            <Typography component="h2" variant="h5">Daftarkan diri Anda sebagai volunteer!</Typography><br/>
            <Typography>Bantu kami menjalankan berbagai program untuk santri tahfidz dengan mendaftarkan diri anda sebagai volunteer di Markaz Pilar.</Typography>
              <br/>
              <Typography>
              <Grid container spacing={6}>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>PROGRAM BERCOCOK TANAM</b><br/>
                      </div>
                      Lokasi: Hutan UI<br/>
                      Jadwal: Selasa, 14 September 2021<br/>
                      Jumlah Volunteer: 3<br/><br/>
                      <div className={classes.sub}>
                        <b>Lihat program lain →</b><br/>
                      </div>
                  </Grid>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>PROGRAM BERCOCOK TANAM</b><br/>
                      </div>
                      Lokasi: Hutan UI<br/>
                      Jadwal: Selasa, 14 September 2021<br/>
                      Jumlah Volunteer: 3
                  </Grid>
              </Grid>
              </Typography>
          </Grid>
          <Grid item xs className={classes.heading}
          sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            />
        </Grid>
    </div>

    <Typography>
    <div className={classes.pad1}>
        <div className={classes.sub}>
            <b>HUBUNGI KAMI</b><br/>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={10} sm={6} md={6} className={classes.email}>
            <WhatsAppIcon color='primary'/>
            <br/>
            +62 123456789
          </Grid>
          <Grid item xs={10} sm={6} md={6} className={classes.email}>
            <EmailIcon color='primary'/>
            <br/>
            markaz.pillar@gmail.com
          </Grid>
        </Grid>
    </div>
    </Typography>
    </ThemeProvider>
  )
}
