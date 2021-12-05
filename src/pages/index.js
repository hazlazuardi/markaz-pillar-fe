import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import React, {useState} from "react";
import Link from "@mui/material/Link";
import useSWR from "swr";
import {axiosMain} from "../axiosInstances";
import {useRouter} from "next/router";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@mui/material/MobileStepper';
import Box from '@mui/material/Box';


const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

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

export default function Home(props) {

  const router = useRouter();
  const { data: responseLanding, error, mutate }
      = useSWR(router.isReady ? `/landing` : null, fetcher)
  const classes = useStyles();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  console.log(responseLanding)

  if (!responseLanding) return "wait..."

  const images = [
    {
      imgPath: responseLanding.result.programCarousel[0].thumbnailURL
    },
    {
      imgPath: responseLanding.result.programCarousel[1].thumbnailURL
    },
  ];

  const maxSteps = images.length;

  return (
    <>
      <div className={classes.bg}>
        <div className={classes.pad1}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6} md={6} className={classes.heading}>
              <Image src="/logo.png" layout="intrinsic"
                     width={2000} height={1200} quality={65} sizes={30} alt='Backdrop' />
            </Grid>
            <Grid item xs={12} sm={6} md={6} className={classes.content}>
              <Typography>
                <b className={classes.sub}>
                  TENTANG KAMI<br /><br />
                </b>
              </Typography>
              <Typography component="h2" variant="h5">Markaz Pilar</Typography><br />
              <Typography>
                Markaz Pilar adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Neque, mauris purus nulla fermentum scelerisque pharetra feugiat.
                Nisl mi maecenas ut et iaculis. Eget lacus, sapien adipiscing in id nam.
                Phasellus purus amet consectetur id ultricies aliquam sed magna habitant.
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={0} direction={largeScreen ? "row" : "column-reverse"}>
            <Grid item xs>
              <Typography className={classes.contentCenter}>
                <Grid item>
                  <Image src={responseLanding.result.program.thumbnailURL} layout='intrinsic'
                         width={100} height={100} quality={65} sizes={50} alt='Backdrop' />
                </Grid>
                <b className={classes.sub}>
                  TENTANG KAMI
                </b><br />
                Daftarkan diri anda sebagai relawan di kegiatan untuk santri Markaz Pilar<br /><br />
                <Link href={`/relawan/kegiatan`}>
                  <Button variant="contained" className={classes.btn}>Lihat Kegiatan</Button>
                </Link>
              </Typography>
            </Grid>

            <Grid item xs>
              <Typography className={classes.contentCenter}>
                <Grid item>
                  <Image src={responseLanding.result.markaz.thumbnailURL} layout='intrinsic'
                         width={100} height={100} quality={65} sizes={50} alt='Backdrop' />
                </Grid>
                <b className={classes.sub}>
                  TENTANG KAMI
                </b><br />
                Lihat markaz yang terdaftar di Markaz Pilar.<br /><br />
                <Link href={`/markaz`}>
                  <Button variant="contained" className={classes.btn}>Lihat Markaz</Button>
                </Link>
              </Typography>
            </Grid>

            <Grid item xs>
              <Typography className={classes.contentCenter}>
                <Grid item>
                <Image src={responseLanding.result.santri.thumbnailURL} layout='intrinsic'
                       width={100} height={100} quality={65} sizes={50} alt='Backdrop' />
                </Grid>
                <b className={classes.sub}>
                  TENTANG KAMI
                </b><br />
                Lihat santri yang terdaftar di Markaz Pilar<br /><br />
                <Link href={`/santri`}>
                  <Button variant="contained" className={classes.btn}>Lihat Santri</Button>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </div>
      </div>
      <Grid container spacing={0} direction={largeScreen ? "row" : "column-reverse"}>
        <Grid item xs className={classes.heading}>
          <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
          >
            {images.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                          component="img"
                          sx={{
                            height: 255,
                            display: 'block',
                            maxWidth: 400,
                            overflow: 'hidden',
                            width: '100%',
                          }}
                          src={step.imgPath}
                          alt={step.label}
                      />
                  ) : null}
                </div>
            ))}
          </SwipeableViews>
          <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                  ) : (
                      <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                  ) : (
                      <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
          />
        </Grid>
        <Grid item xs className={classes.content}>
          <Typography>
            <b className={classes.sub}>
              PROGRAM UNTUK SANTRI TAHFIDZ
            </b>
          </Typography>
          <br/>
          <Typography>
            <Typography component="h2" variant="h5">Daftarkan diri Anda sebagai volunteer!<br /></Typography>
            <br/>
            <Typography>Bantu kami menjalankan berbagai program untuk santri tahfidz dengan mendaftarkan diri anda sebagai volunteer di Markaz Pilar.</Typography>
            <br />
            <Grid container spacing={5}>
              <Grid item xs>
                <div className={classes.sub}>
                  <b>{responseLanding.result.programCarousel[0].name}</b><br />
                </div>
                Lokasi: {responseLanding.result.programCarousel[0].location}<br />
                Jadwal: {responseLanding.result.programCarousel[0].schedule}<br />
                Jumlah Volunteer: {responseLanding.result.programCarousel[0].volunteerNeeded}
                <div className={classes.sub}>
                  <br />
                  <Link href={`/relawan/kegiatan`}>
                    <b>Lihat program lain →</b><br />
                  </Link>
                </div>
              </Grid>
              <Grid item xs>
                <div className={classes.sub}>
                  <b>{responseLanding.result.programCarousel[1].name}</b><br />
                </div>
                Lokasi: {responseLanding.result.programCarousel[1].location}<br />
                Jadwal: {responseLanding.result.programCarousel[1].schedule}<br />
                Jumlah Volunteer: {responseLanding.result.programCarousel[1].volunteerNeeded}
              </Grid>
            </Grid>
          </Typography>
        </Grid>
      </Grid>

      <br/>

      <Typography>
        <div className={classes.pad1}>
          <div className={classes.sub}>
            <b>HUBUNGI KAMI</b><br />
          </div>
          <Grid container spacing={0}>
            <Grid item xs={10} sm={6} md={6} className={classes.email}>
              <WhatsAppIcon color='primary' />
              <br />
              +62 123456789
            </Grid>
            <Grid item xs={10} sm={6} md={6} className={classes.email}>
              <EmailIcon color='primary' />
              <br />
              markaz.pillar@gmail.com
            </Grid>
          </Grid>
        </div>
      </Typography>
    </>
  )
}
