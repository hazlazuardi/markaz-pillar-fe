import React from "react";
import Grid from "@mui/material/Grid";
import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import Image from 'next/image'

export default function DetailView(props) {
  const { data, variant } = props
  const result = !!data ? data.result : null

  const isSM = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center", mb: '2em' }}
        direction='row-reverse'
      >
        <Grid item xs={12} md={6} >
          <Container disableGutters >
            <Image src={result.image} layout='responsive'
              width={16} height={16} quality={65} sizes={20} alt='Backdrop' />
          </Container>
        </Grid>
        <Grid item xs={12} md={6} width='100%'>
          <Typography variant='h5' color='primary' component='h1' gutterBottom sx={{ textTransform: 'capitalize' }} >{!!data ? result.title : variant + '...'}</Typography>
          {!!data ? (
            <Box display='flex' flexDirection='column' height='100%'  >
              <Typography variant={isSM ? 'h4' : 'h1'} component='body' gutterBottom mb={4}>{result.description}</Typography>
              <Grid data-testid='detail-at-detailview' container spacing={2}>
                {result.details.map((detail, index) => (
                  <>
                    {!!detail.detail && (
                      <Grid key={index} item>
                        <Typography color='secondary' variant='h6' component='h6' >{detail.subtitle}</Typography>
                        <Typography variant='h5' component='body'>{detail.detail}</Typography>
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </ Box>
          ) : "Loading.."}
        </Grid>
      </Grid>
    </>
  );
}