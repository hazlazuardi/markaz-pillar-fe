import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Profile(props) {
  const {
    name,
    desc,
    background,
    markaz,
    asal,
    gender,
    ttl,
    scholarship,
    placeholderMarkaz,
    markazObject,
    santriObject,
    placeholderSantri,
  } = props;

  const theme = useTheme();
  const mediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const largeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid item sm={12} lg={6} sx={{ width: "100%" }}>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sx={{ display: largeScreen ? "block" : "none" }}>
          <Typography variant="h4" mb={5}>
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{background}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{desc}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="body1">Background</Typography>
        </Grid>

        {Object.keys(markazObject).map(
          (key, index) =>
            markazObject[key] && (
              <Grid item xs={6}>
                <Typography variant="body1">
                  <LocalShippingOutlinedIcon /> {placeholderMarkaz[key]}
                </Typography>
                <Typography variant="body2">{markazObject[key]}</Typography>
              </Grid>
            )
        )}

        {/* {Object.keys(santriObject).map(
          (key, index) =>
            santriObject[key] && (
              <Grid item xs={6}>
                <Typography variant="body1">
                  <LocalShippingOutlinedIcon /> {placeholderSantri[key]}
                </Typography>
                <Typography variant="body2">{santriObject[key]}</Typography>
              </Grid>
            )
        )} */}
      </Grid>
    </Grid>
  );
}
