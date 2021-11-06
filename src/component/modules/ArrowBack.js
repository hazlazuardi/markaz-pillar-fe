import React from "react";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function ArrowBack(props) {
  const { name, markazOrSantri } = props;

  return (
    <Grid
      item
      sm={12}
      lg={12}
      mb={8}
      // margin={0}
      // sx={{ display: largeScreen ? "block" : "none" }}
    >
      <Link href={`/${markazOrSantri}/`} passHref>
        <Button variant="text" href>
          <ArrowBackIcon /> {name}
        </Button>
      </Link>
    </Grid>
  );
}
