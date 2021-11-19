import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/Home.module.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DonationProgress from "../../modules/DonationProgress";
import Profile from "../../modules/Profile";
import DetailPic from "../../modules/DetailPic";

function Detail(props) {
  const {
    consistent,
    inconsistent,
    image,
    donatetext,
    adminbutton,
    markazOrSantri,
    donated,
    nominal,
  } = props;
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <Container disableGutters>
        <Grid container sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12}>
            <Container maxWidth="lg" className={styles.container}>
              <Grid
                container
                spacing={3}
                direction={largeScreen ? "row" : "column-reverse"}
              >
                <Profile consistent={consistent} inconsistent={inconsistent} />
                <DetailPic
                  image={image}
                  name={consistent.name}
                  nominal={
                    donated != null && nominal != null
                      ? `${donated}/${nominal}`
                      : ""
                  }
                  progress={
                    donated != null && nominal != null
                      ? (donated / nominal) * 100
                      : -1
                  }
                  donasi={donatetext}
                  admin={adminbutton}
                  markazOrSantri={markazOrSantri}
                  id={consistent.id}
                />
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Detail;
