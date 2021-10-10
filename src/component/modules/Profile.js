import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Profile(props) {
  const { consistent, inconsistent } = props;
  const { name, background } = consistent;

  const theme = useTheme();
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
          <Typography variant="h6" color="primary" fontWeight="medium">
            Background
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5">{background}</Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {Object.keys(inconsistent).map(
          (key, index) =>
            inconsistent[key] && (
              <Grid item xs={6}>
                <Typography variant="body1" color="primary" fontWeight="medium">
                  <LocalShippingOutlinedIcon /> {key}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {inconsistent[key]}
                </Typography>
              </Grid>
            )
        )}
      </Grid>

    </Grid>
  );
}
