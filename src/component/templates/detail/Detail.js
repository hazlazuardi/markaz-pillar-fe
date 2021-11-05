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
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

function Detail(props) {
  const {
    consistent,
    inconsistent,
    image,
    donatetext,
    adminbutton,
    markazOrSantri,
    router
  } = props;
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Container maxWidth="lg" className={styles.container}>
            <ArrowBack name={consistent.name} markazOrSantri={markazOrSantri} />
            <Grid
              container
              spacing={3}
              direction={largeScreen ? "row" : "column-reverse"}
            >
              <Profile consistent={consistent} inconsistent={inconsistent} />
              <DetailPic
                image={image}
                name={consistent.name}
                nominal="500.000/1.000.000"
                progress={50}
                donasi={donatetext}
                admin={adminbutton}
                markazOrSantri = {markazOrSantri}
                id = {consistent.id}
                router= {router}
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

export default Detail;
