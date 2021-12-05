import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import useSWR from 'swr';
import { axiosMain } from '../axiosInstances';

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);
export default function Landing(props) {
  const { allLanding } = props
  const { data: responseLanding, error, mutate } = useSWR('/landing', fetcher, { fallbackData: allLanding, refreshInterval: 10000 })

  console.log('static', allLanding)
  console.log('swr', responseLanding)




  return (
    <>
      {/* Hero About Me */}
      <Grid container>
        <Grid item>
          <Typography>Title Gede</Typography>
          <Typography>Title Kecil</Typography>
        </Grid>
        <Grid item>
          <Box>
            <Typography>
              Image
            </Typography>
          </Box>
        </Grid>
      </Grid>


      {/* Cards Feature */}
      <Grid container spacing={2}>
        <Grid item>
          {responseLanding.result.markaz.name}
        </Grid>
        <Grid item>
          {responseLanding.result.santri.name}
        </Grid>
        <Grid item>
          {responseLanding.result.program.name}
        </Grid>
      </Grid>


      {/* Carousel */}
      {!!responseLanding.result.programCarousel.length > 1 && (
        <>
          <Typography>Ada carousel</Typography>
          <Grid container>
            <Grid item>
              
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
