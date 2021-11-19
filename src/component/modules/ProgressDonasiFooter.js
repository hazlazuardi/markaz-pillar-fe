import React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { Card, CardContent, CardMedia, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import { Box, width } from '@mui/system'
import Image from 'next/image'
import LinesEllipsis from 'react-lines-ellipsis'

export default function ProgressDonasiFooter() {

    const data = [
        {
            id: 0,
            progressDate: '21-12-2001',
            description: 'Kipas ini sangat bermanfaat bagi Jeff Bezos karena rumahnya sangat gerah.'
        },
        {
            id: 1,
            progressDate: '09-10-2001',
            description: 'Jeff Bezos kali ini memiliki sepeda untuk beli mangga di pasar.'
        },
        {
            id: 2,
            progressDate: '31-04-2001',
            description: 'Jeff.'
        },
        {
            id: 3,
            progressDate: '31-04-2001',
            description: 'Hazmiiiii.'
        },
    ]

    const isXXS = useMediaQuery("(max-width:400px)");
    const IMAGE_SIZE = 200
    return (
        <>
            <Typography variant='h4' component='h2' sx={{ mb: '1em' }}>Progress Donasi</Typography>
            <Grid container spacing={2}  >
                {!!data && data.map(progress => (
                    <Grid key={progress.id} item xs={12} md={6} >
                        <Card sx={isXXS ? { display: 'block' } : { display: 'flex' }} variant='outlined' >
                            <CardMedia sx={isXXS ? { width: '100%', height: '100%' } : { width: IMAGE_SIZE, height: IMAGE_SIZE }} alt="Live from space album cover">
                                <Box position='relative' sx={isXXS ? { width: '100%', height: '100%' } : { width: IMAGE_SIZE, height: IMAGE_SIZE }}>
                                    <Image src='https://source.unsplash.com/random' layout={isXXS ? 'responsive' : 'fill'}
                                        objectFit='cover' alt='Backdrop' width={isXXS ? 16 : IMAGE_SIZE} height={isXXS ? 16 : IMAGE_SIZE} />
                                </Box>
                            </CardMedia>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="body1">
                                        <LinesEllipsis
                                            text={progress.description}
                                            maxLine='3'
                                            ellipsis='...'
                                            trimRight
                                            basedOn='words'
                                        />
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }} pl={2} >
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {progress.progressDate}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}
