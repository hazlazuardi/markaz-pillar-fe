import { Card, Container, Pagination, Stack, Typography, useMediaQuery, CardMedia, CardContent, Grid, CardActionArea, CardActions, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import Image from 'next/image'
import useSWR from 'swr';
import { axiosApiRoutes } from '../axiosInstances';

const fetcher = url => axiosApiRoutes.get(url).then(res => res.data)

export default function Activity() {
    const { data, error } = useSWR('/api/activity', fetcher)
    const [page, setPage] = useState(1);
    const handlePagination = (event, value) => {
        setPage(value);
    };

    console.log(data)
    const convertDataKeys = {
        
    }

    const matchXs = useMediaQuery('(max-width:600px)')
    return (
        <Container maxWidth="lg" >

            {/* Content */}
            <Box>

                <Grid container spacing={2}>
                    {/* Each Card */}
                    {!!data && data.map(activity => (
                        <Grid key={activity.id} item xs={6} sm={6} md={6}>
                            <Card sx={{ width: '100%' }}>
                                <CardActionArea sx={{ display: { xs: 'block', md: 'flex' } }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        width='140'
                                        image="https://source.unsplash.com/random"
                                    />
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            {Object.entries(activity).map((array, index) => (
                                                <Grid item key={index}>
                                                    <Typography variant='body2' color='secondary'>{array[0]}</Typography>
                                                    <Typography variant='body1'>{array[1]}</Typography>
                                                </ Grid>
                                            ))}
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions sx={{ width: '100%' }}>
                                    <Button size="small" fullWidth='true' color="secondary">
                                        Share
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Typography>Page: {page}</Typography>
            </Box>


            {/* Pagination */}
            <Stack sx={{ bottom: '3em' }} spacing={2} alignItems='center' >
                <Pagination size={matchXs ? 'small' : 'medium'} boundaryCount={1} count={10} page={page} onChange={handlePagination} />
            </Stack>
        </Container>
    );
}
