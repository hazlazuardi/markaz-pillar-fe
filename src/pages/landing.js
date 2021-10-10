import { useTheme } from '@mui/material/styles';
import styles from '../styles/Home.module.css';
import Layout from "../component/layout";
import Link from 'next/link';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

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
  pad: {
    padding: "0%",
  },
  pad1: {
      padding: "5%",
    },
  email: {
    padding: "3%",
    textAlign: "center",
},
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'));
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
  <>
      <div className={classes.bg}>
      <div className={classes.pad1}>
        <Grid container spacing={0}>
          <Grid item xs={10} sm={6} md={6} className={classes.heading}>
            LOGO
          </Grid>
          <Grid item xs={12} sm={6} md={6} className={classes.content}>
            <b className={classes.sub}>
                TENTANG KAMI<br/>
            </b>
            <h2>Markaz Pilar</h2><br/>
            Markaz Pilar adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Neque, mauris purus nulla fermentum scelerisque pharetra feugiat.
            Nisl mi maecenas ut et iaculis. Eget lacus, sapien adipiscing in id nam.
            Phasellus purus amet consectetur id ultricies aliquam sed magna habitant.
          </Grid>
        </Grid>

        <Grid container spacing={0} direction={largeScreen? "row":"column-reverse"}>
          <Grid item xs>
            <p className={classes.contentCenter}>
                FOTO<br/><br/>
                <b className={classes.sub}>
                TENTANG KAMI
                </b><br/>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.<br/><br/>
                <Button variant="contained" className={classes.btn}>Donasi Sekarang</Button>
            </p>
          </Grid>

          <Grid item xs>
            <p className={classes.contentCenter}>
                FOTO<br/><br/>
                <b className={classes.sub}>
                TENTANG KAMI
                </b><br/>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.<br/><br/>
                <Button variant="contained" className={classes.btn}>Lihat Markaz</Button>
            </p>
          </Grid>

          <Grid item xs>
            <p className={classes.contentCenter}>
                FOTO<br/><br/>
                <b className={classes.sub}>
                TENTANG KAMI
                </b><br/>
                At eripuit signiferumque sea, vel ad mucius molestie, cu labitur.<br/><br/>
                <Button variant="contained" className={classes.btn}>Lihat Santri</Button>
            </p>
          </Grid>
        </Grid>
      </div>
      </div>
        <Grid container spacing={0} direction={largeScreen? "row":"column-reverse"} className={classes.pad}>
          <Grid item xs className={classes.content}>
            <b className={classes.sub}>
                PROGRAM UNTUK MASYARAKAT<br/>
            </b>
            <h2>Ikuti berbagai kelas di Markaz Pilar!</h2><br/>
            <p>Daftarkan diri anda untuk mengikuti berbagai kelas yang akan dipandu oleh para ahli dibidangnya.</p>
              <Grid container spacing={5}>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>KELAS HADIST</b><br/>
                      </div>
                      Pengajar: Muhammad Adam, S.Pd.I.<br/>
                      Lokasi: Masjid UI Depok<br/>
                      Jadwal: Senin, 13.00-14.00<br/>
                      <div className={classes.sub}>
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
          </Grid>
          <Grid item xs className={classes.heading}>
            FOTO
          </Grid>
        </Grid>

        <Grid container spacing={0} direction={largeScreen? "row":"column-reverse"} className={classes.pad}>
          <Grid item xs className={classes.heading}>
            FOTO
          </Grid>
          <Grid item xs className={classes.content}>
             <h2>Daftarkan diri anda sebagai pengajar di berbagai kelas!</h2><br/>
             <p>Kami juga membutuhkan lulusan santri yang dapat membantu kami memandu kelas untuk santri tahfidz.</p>
              <Grid container spacing={5}>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>KELAS HADIST</b><br/>
                      </div>
                      Pengajar: Muhammad Adam, S.Pd.I.<br/>
                      Lokasi: Masjid UI Depok<br/>
                      Jadwal: Senin, 13.00-14.00<br/>
                      <div className={classes.sub}>
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
          </Grid>
        </Grid>

    <div className={classes.bg}>
        <Grid container spacing={0} direction={largeScreen? "row":"column-reverse"} className={classes.pad}>
          <Grid item xs className={classes.content}>
            <b className={classes.sub}>
                PROGRAM UNTUK SANTRI TAHFIDZ<br/>
            </b>
            <h2>Daftarkan diri Anda sebagai volunteer!</h2><br/>
            <p>Bantu kami menjalankan berbagai program untuk santri tahfidz dengan mendaftarkan diri anda sebagai volunteer di Markaz Pilar.</p>
              <Grid container spacing={6}>
                  <Grid item xs>
                      <div className={classes.sub}>
                        <b>PROGRAM BERCOCOK TANAM</b><br/>
                      </div>
                      Lokasi: Hutan UI<br/>
                      Jadwal: Selasa, 14 September 2021<br/>
                      Jumlah Volunteer: 3<br/>
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
          </Grid>
          <Grid item xs className={classes.heading}>
            FOTO
          </Grid>
        </Grid>
    </div>

    <div className={classes.pad1}>
        <div className={classes.sub}>
            <b>HUBUNGI KAMI</b><br/>
        </div>
        <Grid container spacing={0}>
          <Grid item xs={10} sm={6} md={6} className={classes.email}>
            LOGO<br/>
            +62 123456789
          </Grid>
          <Grid item xs={10} sm={6} md={6} className={classes.email}>
            LOGO<br/>
            markaz.pillar@gmail.com
          </Grid>
        </Grid>
    </div>
    </>
  )
}