import React, { useEffect, useState } from 'react'
import { Grid, Stack } from '@mui/material';
import useSWR from 'swr';
import { axiosMain } from '../axiosInstances';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Image from 'next/image'
import Link from 'next/link'
import { enumRoutes } from '../context/AppReducer';
import GridViewCard from '../component/modules/GridViewCard';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);
export default function Landing(props) {
  const { allLanding } = props
  const { data: responseLanding, error, mutate } = useSWR('/landing', fetcher, { fallbackData: allLanding, refreshInterval: 100000 })





  // *****************************************
  // Carousel
  // *****************************************
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = 2;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };



  return (
    <>
      {/* Hero About Me */}
      <Grid container>
        {/* Hero About Me */}
        <Grid item xs={12} md={6}>
          <Box
            // component="img"
            pl={{ xs: 10, md: 2 }} pr={{ xs: 10, md: 2 }}
            sx={{
              height: '100%',
              width: '100%',
              display: 'block',
              // maxWidth: 300,
              overflow: 'hidden',
            }}
          // src={program.thumbnailURL}
          >
            <Image src='/icon.png' layout='responsive'
              width={16} height={16} quality={65} sizes={20} alt='' objectFit="cover"
            />
          </Box>
        </Grid>

        {/* Text About Me */}
        <Grid item xs={12} md={6} p={2} >
          <Stack spacing={2} p={0}>
            <Typography mt={{ xs: 0, md: '25%' }} variant='h6' component='h2' color='primary'>Tentang Kami</Typography>
            <Typography variant='h4' component='h1' color='primary'>Markaz Pillar</Typography>
            <Typography variant='body1' paragraph>Markaz Pillar adalah Yaudah Terserah Kalian aja — Adyssa</Typography>
          </Stack>
        </Grid>
      </Grid>


      {/* Cards Feature */}
      <Grid container mt={4}>
        {/* Markaz */}
        <Grid item xs={12} sm={4} p={2} pl={{ xs: 12, sm: 2 }} pr={{ xs: 12, sm: 2 }} sx={{ height: 400 }} alignItems='center' justifyContent='center'>
          <Image src={responseLanding.result.markaz.thumbnailURL} layout='responsive'
            width={16} height={16} quality={65} sizes={20} alt='' objectFit="cover"
          />
          <Typography variant='h6' component='h6' textAlign='center' mt={2}>{responseLanding.result.markaz.name}</Typography>
          <Typography variant='body1' component='p' textAlign='center' mt={2} sx={{ textOverflow: 'ellipsis' }}>{responseLanding.result.markaz.background}</Typography>
          <Box mt={2} mb={0} display='flex' alignItems='center' justifyContent='center'>
            <Link href={`${enumRoutes.MEMBER_MARKAZ}/${responseLanding.result.markaz.id}/donasi/bayar`} passHref>
              <Button variant='contained' fullWidth>Donasi Sekarang</Button>
            </Link>
          </Box>
        </Grid>


        {/* Santri */}
        <Grid item xs={12} sm={4} p={2} pl={{ xs: 12, sm: 2 }} pr={{ xs: 12, sm: 2 }} sx={{ height: 400 }} alignItems='center' justifyContent='center' overflow='hidden'>
          <Image src={responseLanding.result.santri.thumbnailURL} layout='responsive'
            width={16} height={16} quality={65} sizes={20} alt='' objectFit="cover"
          />
          <Typography variant='h6' component='h6' textAlign='center' mt={2}>{responseLanding.result.santri.name}</Typography>
          <Typography variant='body1' component='p' textAlign='center' mt={2} sx={{ textOverflow: 'ellipsis', height: 24 }} >{responseLanding.result.santri.background}</Typography>
          <Box mt={2} display='flex' alignItems='center' justifyContent='center'>
            <Link href={`${enumRoutes.MEMBER_SANTRI}/${responseLanding.result.santri.id}/donasi/bayar`} passHref>
              <Button variant='contained' fullWidth>Donasi Sekarang</Button>
            </Link>
          </Box>
        </Grid>

        {/* Kegiatan */}
        <Grid item xs={12} sm={4} p={2} pl={{ xs: 12, sm: 2 }} pr={{ xs: 12, sm: 2 }} sx={{ height: 400 }} alignItems='center' justifyContent='center'>
          <Image src={responseLanding.result.program.thumbnailURL} layout='responsive'
            width={16} height={16} quality={65} sizes={20} alt='' objectFit="cover"
          />
          <Typography variant='h6' component='h6' textAlign='center' mt={2}>{responseLanding.result.program.name}</Typography>
          <Typography variant='body1' component='p' textAlign='center' mt={2} sx={{ textOverflow: 'ellipsis', height: 24 }} >{responseLanding.result.program.description}</Typography>
          <Box mt={2} display='flex' alignItems='center' justifyContent='center'>
            <Link href={`${enumRoutes.MEMBER_KEGIATAN}/${responseLanding.result.program.id}/registrasi`} passHref>
              <Button variant='contained' fullWidth>Daftar Sekarang</Button>
            </Link>
          </Box>
        </Grid>
      </Grid>


      {/* Carousel Section */}
      {responseLanding.result.programCarousel.length === 2 && (
        <>
          <Grid container sx={{ backgroundColor: 'rgba(134,182,188,.2)' }} pb={4} pt={4} mt={4}>
            {/* Carousel */}
            <Grid item xs={12} sm={6}>
              <Box p={4} sx={{ flexGrow: 1 }}>
                <AutoPlaySwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {responseLanding.result.programCarousel.map((program, index) => (
                    <div key={program.name}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Box
                          // component="img"
                          sx={{
                            height: '100%',
                            width: '100%',
                            display: 'block',
                            // maxWidth: 300,
                            overflow: 'hidden',
                          }}
                        // src={program.thumbnailURL}
                        >
                          <Image src={program.thumbnailURL} layout='responsive'
                            width={16} height={16} quality={65} sizes={20} alt='' objectFit="cover"
                          />
                          <Typography variant='h6' p={2} sx={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'rgba(255,255,255,.5)', backdropFilter: 'blur(5px)' }} >{program.name}</Typography>
                        </Box>
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
                {/* <MobileStepper
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
                /> */}
              </Box>

            </Grid>

            {/* Text Section */}
            <Grid item xs={12} sm={6} p={2}>
              <Stack p={0} spacing={2}>
                <Typography variant='h6' component='h5' color='secondary'>Program untuk masyarakat</Typography>
                <Typography variant='h4' component='h2' color='primary'>Daftarkan diri anda sebagai relawan!</Typography>
                <Typography variant='body1' component='p'>Bantu kami menjalankan berbagai program untuk santri tahfidz dengan mendaftarkan diri anda sebagai volunteer di Markaz Pilar.</Typography>
              </Stack>
              <Grid container mt={2} spacing={2}>
                {responseLanding.result.programCarousel.map(program => (
                  <Grid key={program.id} item xs={12} md={6} spacing={2} >
                    <Typography variant='h6' component='h6'>{program.name}</Typography>
                    <Typography variant='subtitle1' component='h6'>{program.description}</Typography>
                    <Typography variant='caption' component='h6'>{program.location}</Typography>
                    <Typography variant='caption' component='h6'>Jumlah Relawan: {program.volunteerApplied} / {program.volunteerNeeded}</Typography>
                    <Link href={`${enumRoutes.MEMBER_KEGIATAN}/${responseLanding.result.program.id}/registrasi`} passHref>
                      <Button mt={2} variant='contained'>Daftar Sekarang</Button>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export async function getStaticProps() {
  const staticLandingResponse = await axiosMain.get("/landing");
  const staticLanding = staticLandingResponse.data
  return {
    props: {
      allLanding: staticLanding
    },
    revalidate: 10
  }
}
