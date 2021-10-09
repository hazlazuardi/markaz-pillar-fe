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

function DetailWis(props) {
  const { consistent, inconsistent } = props;
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));

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
              <ArrowBack name={consistent.name} />
              <Profile consistent={consistent} inconsistent={inconsistent} />
              <DetailPic
                name={consistent.name}
                nominal="500.000/1.000.000"
                progress={50}
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

export default DetailWis;
