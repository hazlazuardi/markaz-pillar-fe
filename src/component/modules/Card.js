import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Card(props) {
  const {
    image,
    name,
    desc,
    id,
    detail,
    handleDelete
  } = props;

  const router = useRouter()
  const path = router.pathname

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
            <Link  href={`/${detail}/` + id} passHref>
              <Typography data-testid='name-at-card' variant="h6">{name.length > 18 ? name.substring(0, 18) + "..." : name}</Typography>
            </Link>
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

            {path.includes('admin') ? (<>
              <Link href={`${path}/edit/` + id} passHref>
                <Button variant="contained">Edit</Button>
              </Link>

              <Button variant="outlined" onClick={() => handleDelete(id)} >Delete</Button>
            </>
            ) : (
              <>
                <Link href={`${path}/donasi/` + id} passHref>
                  <Button variant="contained">Donasi</Button>
                </Link>
                <Link href={`${path}/` + id} passHref>
                  <Button variant="outlined">Lihat Detail</Button>
                </Link>
              </>)
            }
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}


// TODO:
// 1. Ubah conditional nya jadi sesuaiin router.pathname, bukan currentUserRole!