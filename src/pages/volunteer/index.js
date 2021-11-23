import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import { Grid, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import GridView from "../../component/templates/admin/GridView";
import LandingGridView from "../../component/templates/LandingGridView";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "7%",
    textAlign: "left",
    width: "100%",
  },
  contentCenter: {
    padding: "7%",
    textAlign: "center",
  },
  bg: {
    backgroundColor: "#f1f4f5",
  },
  sub: {
    color: "#004F5D",
  },
  heading: {
    fontSize: "200%",
    padding: "7%",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#004F5D",
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  pad1: {
    padding: "3%",
  },
  email: {
    textAlign: "center",
  },
}));

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [page, setPage] = useState(1);

  const { data: randomProgram, error: error1 } = useSWR(
    `/volunteer/random
`,
    fetcher
  );

  const { data: responseProgram, error: error2 } = useSWR(
    `/volunteer?n=4&page=${page - 1}
`,
    fetcher
  );

  const buttonVolunteer = () => {
    return (
      <>
        <Stack direction="row" width="100%" spacing={2} sx={{ p: 1 }}>
          <Link href={responseProgram} target="_blank" underline="none">
            <Button variant="outlined">Daftar</Button>
          </Link>
          <Link href={responseProgram} target="_blank" underline="none">
            <Button variant="outlined">Lihat Detail</Button>
          </Link>
        </Stack>
      </>
    );
  };

  const matches = useMediaQuery("(max-width:600px)");
  const size = matches ? "small" : "medium";

  if (error2 && error1) {
    return "an error has occured.";
  }
  if (!responseProgram && !randomProgram) {
    return "loading...";
  }
  return (
    <>
      {!!responseProgram && !!randomProgram && (
        <>
          <div className={classes.bg}>
            <div className={classes.pad1}>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={6}
                  className={classes.heading}
                  sx={{
                    backgroundImage: `url(${randomProgram.result.thumbnailURL})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <Grid item xs={12} sm={6} md={6} className={classes.content}>
                  <Typography>
                    <b className={classes.sub}>
                      Relawan <br />
                      <br />
                    </b>
                  </Typography>
                  <Typography component="h2" variant="h5">
                    {randomProgram.result.name}
                  </Typography>
                  <br />
                  <Typography>{randomProgram.result.description}</Typography>
                  <Stack
                    direction="row"
                    width="100%"
                    spacing={2}
                    sx={{ p: 1 }}
                    mt={4}
                  >
                    <Link
                      href={`volunteer/kegiatan/${randomProgram.result.id}`}
                      passHref
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="small"
                      >
                        Daftar Sekarang
                      </Button>
                    </Link>
                    <Link
                      href={`volunteer/${randomProgram.result.id}`}
                      passHref
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        size="small"
                      >
                        Lihat Detail
                      </Button>
                    </Link>
                  </Stack>
                </Grid>
              </Grid>
            </div>
          </div>
          <Grid container mt={9}>
            <LandingGridView
              data={responseProgram}
              size={size}
              page={page}
              setPage={setPage}
            />
          </Grid>
        </>
      )}
    </>
  );
}
