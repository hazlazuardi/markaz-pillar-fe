import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/Home.module.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DonationProgress from "../../modules/DonationProgress";
import Profile from "../../modules/Profile";
import ArrowBack from "../../modules/ArrowBack";
import DetailPic from "../../modules/DetailPic";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';

const BASE_URL = process.env.BACKEND_HOST;

function Detail(props) {
  const { consistent, inconsistent } = props;
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const router = useRouter()
  const { id } = router.query

  const [data, setData] = useState([])

  const getData = async (event) => {
    await fetch(`${BASE_URL}/${markazOrSantri.toLowerCase()}?id=${id}`, {
    method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }
    }).then(preResponse => {
        preResponse.json().then(data => {
            setData(data.result)
        })
    })
  }

  useEffect(() => {
    getData()
  }, [])


  if(!data) {
    return (
      <p>Loading...</p>
    )
  } else {
    console.log(data)
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Container maxWidth="lg" className={styles.container}>
              <Grid
                container
                spacing={3}
                direction={largeScreen ? "row" : "column-reverse"}
              >
                <ArrowBack name={data.name} />
                <Profile 
                name={data.name} 
                markaz={data.markaz ? data.markaz.name : ""}
                background={data.background}
                gender={data.gender}
                btd = {`${data.birthPlace} & ${data.birthDate}`}
                scholarship={data.desc}
                 />
                <DetailPic
                  name={data.name}
                  nominal={`${data.donated}/${data.nominal}`}
                  progress={data.donated/data.nominal}
                  thumbnailURL = {data.thumbnailURL}
                />
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: "lightgray" }}>
            <Container maxWidth="lg" className={styles.container}>
              <Typography variant="body2" mb={3}>
                PROGRESS DONASI
              </Typography>
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <DonationProgress
                  image="image"
                  tanggal="tanggal"
                  desc="Deskripsi Donasi"
                />
                <DonationProgress
                  image="image"
                  tanggal="tanggal"
                  desc="Deskripsi Donasi"
                />
                <DonationProgress
                  image="image"
                  tanggal="tanggal"
                  desc="Deskripsi Donasi"
                />
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </div>
    );
  }
  
}

export default Detail;
