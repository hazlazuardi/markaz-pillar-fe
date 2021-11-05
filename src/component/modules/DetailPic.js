import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/styles";


export default function DetailPic(props) {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "primary" : "#308fe8",
    },
  }));

  const themeHook = useTheme();
  const largeScreen = useMediaQuery(themeHook.breakpoints.up("lg"));

  const { name, nominal, progress, image, donasi, admin } = props;

  return (
    <Grid item sm={12} lg={6} sx={{ width: "100%" }}>
      <Grid
        container
        spacing={2}
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Grid item xs={12} sx={{ display: largeScreen ? "none" : "block" }}>
          <Typography variant="h4" mb={2} sx={{ textTransform: "uppercase" }}>
            {name}
          </Typography>
        </Grid>
        {admin}
        <Grid
          item
          xs={12}
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              width: 400,
              height: 400,
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            mb={1}
          />
        </Grid>
        <Grid item sm={12} sx={{ textAlign: "center" }}>
          <Typography variant="body2" mb={1} color="primary" fontWeight="bold">
            NOMINAL YANG DIBUTUHKAN
          </Typography>
        </Grid>
        <Grid item mb={1} sx={{ textAlign: "center", width: 400 }}>
          <Typography variant="body2" mb={1}>
            {nominal}
          </Typography>
          <BorderLinearProgress variant="determinate" value={progress} />
        </Grid>
        <Grid item sm={12}>
          <Box sx={{ textAlign: "center", width: "auto" }}>
            <Button variant="contained">{donasi}</Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
