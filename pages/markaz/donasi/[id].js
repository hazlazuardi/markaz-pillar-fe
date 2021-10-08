import React from "react";
import DetailTemplate from "../../../component/templates/detail/Detail";
import Layout from "../../../component/layout";
import Container from "@mui/material/Container";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/Home.module.css";
import ArrowBack from "../../../component/modules/ArrowBack";

export default function markaz_donasi() {
  return (
    <Container maxWidth="lg" className={styles.container}>
      <Grid Grid container spacing={3} justify="center" mb={10}>
        <Grid item xs={12}>
          <ArrowBack /> DONASI
        </Grid>
        <Grid item xs={4} align="center" color="green">
          Informasi Donasi
        </Grid>
        <Grid item xs={4} align="center">
          Metode Pembayaran
        </Grid>
        <Grid item xs={4} align="center">
          Konfirmasi Pembayaran
        </Grid>
      </Grid>
      <Grid container spacing={0} justify="center" mt={10} mb={10}>
        <Grid item xs={12}>
          <Typography variant="body1" align={"center"}>
            Berapa jumlah uang yang ingin Anda donasikan kepada Markaz Depok?
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0} justify="center">
        <Grid item xs={8}>
          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            id="outlined-basic"
            label="Rp."
            variant="outlined"
            sx={{
              align: "right",
              width: 300,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained">Selanjutnya</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align={"center"}>
            By clicking blablabla
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
