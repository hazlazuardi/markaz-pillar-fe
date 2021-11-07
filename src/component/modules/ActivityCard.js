import React from 'react'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from 'next/image'


export default function ActivityCard() {


    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Paper>
        <Grid container p={1} sx={{display:"flex", flexDirection: smallScreen ? "column" : "row"}}>
            <Grid item sm={2} xs={12} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                <Image src='https://source.unsplash.com/random' width={500} height={500}/>
            </Grid>
            <Grid item sm={10} xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <Grid item sm={4} xs={12} p={1}>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>Jenis Kegiatan</Typography>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>Donasi</Typography>
                            </Grid>

                            <Grid item sm={3} xs={12} p={1}>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>Target Donasi</Typography>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>Markaz Pilar</Typography>
                            </Grid>

                            <Grid item sm={5} xs={12} p={1}>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>Status</Typography>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>Menunggu Pembayaran</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <Grid item sm={4} xs={12} p={1}>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>Tanggal Kegiatan</Typography>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>14/08/2021</Typography>
                            </Grid>
                            
                            <Grid item sm={4} xs={12} p={1}>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>Jumlah Donasi</Typography>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>Rp50.000,00</Typography>
                            </Grid>
                            
                            <Grid item sm={4} xs={12} p={1} sx={{alignSelf:"flex-end"}}>
                                <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>
                                    Lihat Santri <DeleteOutlineIcon/>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </Paper>
    )
}
