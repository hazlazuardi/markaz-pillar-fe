import React from 'react'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from 'next/image'
import Link from "next/link";

export default function ActivityCard(props) {


    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const {type, name, date, secInfo, targetId, recipientType, status} = props

    const capitalizeFirstLetter = (s => {
        return s.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
    });

    const temp = status.split("_");
    const processedStatus = `${capitalizeFirstLetter(temp[0])} ${temp[1].toLowerCase()}`

    // Difference in detail info
    const header1 = type == "Volunteer" ? "Volunteer" : "Donasi"
    const header2 = type == "Volunteer" ? "Tanggal mendaftar" : "Tanggal kegiatan"
    const header3 = type == "Volunteer" ? "Lokasi" : "Jumlah donasi"
    const info1 = type == "Volunteer"? capitalizeFirstLetter(secInfo) : `Rp${secInfo},00`

    return (
        <>
        <Grid item lg={6} xs={12}>
            <Paper>
                <Grid container p={1} sx={{display:"flex", flexDirection: smallScreen ? "column" : "row"}}>
                    <Grid item sm={2} xs={12} sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <Image alt='thumbnail' src='https://source.unsplash.com/random' width={500} height={500}/>
                    </Grid>
                    <Grid item sm={10} xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Grid container sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <Grid item sm={4} xs={12} p={1}>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>Jenis Kegiatan</Typography>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>{(type)}</Typography>
                                    </Grid>

                                    <Grid item sm={3} xs={12} p={1}>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>{header1}</Typography>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>{name.length > 15? capitalizeFirstLetter(name.substring(0, 15) + "...") : capitalizeFirstLetter(name)}</Typography>
                                    </Grid>

                                    <Grid item sm={5} xs={12} p={1}>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>Status</Typography>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>{(processedStatus)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <Grid item sm={4} xs={12} p={1}>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>{header2}</Typography>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>{date.split("T")[0]}</Typography>
                                    </Grid>
                                    
                                    <Grid item sm={4} xs={12} p={1}>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", fontWeight:"bold"}}>{header3}</Typography>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem"}}>{info1}</Typography>
                                    </Grid>
                                    
                                    <Grid item sm={4} xs={12} p={1} sx={{alignSelf:"flex-end"}}>
                                        <Typography sx={{fontSize: smallScreen ? "1.1rem" : "0.75rem", textAlign:"right"}}>
                                            <Link href={recipientType == "VOLUNTEER" ? `/relawan/kegiatan/` : `/${recipientType.toLowerCase()}/` + targetId} passHref>{`Lihat ${capitalizeFirstLetter(recipientType)}`}</Link>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        </>
    )
}
