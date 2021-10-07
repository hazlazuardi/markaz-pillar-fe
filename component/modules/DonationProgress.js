import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function DonationProgress(props) {
    const {image, tanggal, desc} = props

    return (
        <Grid item sm={12} lg={4} md={4} sx={{display:"flex", justifyContent:"center"}}>
            <Box  sx={{
                width: 300,
                height: 300,
                border: '1px solid gray',
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'
            }}>
                <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                    <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)' }}>
                    <Box
                    sx={{
                        width: 60,
                        height: 60,
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                    mb={2}
                    /> 
                    <Typography>{tanggal}</Typography>
                    </Box>
                </Box>
                <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                    {desc}
                </Box>
            </Box>
        </Grid>
    )
}
