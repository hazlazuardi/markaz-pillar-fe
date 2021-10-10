import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function Card(props) {
  const { image, name, desc, intr_1, intr_2 , markazOrSantri, id} = props;

  return (
    <Grid item>
      <Paper sx={{ width: 300, height: 420 }}>
        <Box
          sx={{
            width: "auto",
            height: 250,
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid container spacing={2} className={styles.textCenter}>
          <Grid item xs={12} mt={2}>
            <Typography variant="h6">{name}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              width: 300,
              height: 50,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <Typography noWrap p={1}>
              {desc}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button variant="contained">{intr_1}</Button>
            <Link href={`/${markazOrSantri}/` + id}>
              <Button variant="outlined">{intr_2}</Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
