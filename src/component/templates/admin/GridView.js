import React from "react";
import Grid from "@mui/material/Grid";
import GridViewCard from "../../modules/GridViewCard";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/system";
import { Container } from "@mui/material";

export default function GridView(props) {
  const { data, disableMasonry } = props;
  // array of objects
  const fullResponseResult = data.result;


  if (disableMasonry) {
    return (
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {fullResponseResult.map((result) => (
          <Grid item key={result.id}>
            <GridViewCard image={result.thumbnailURL} title={result.name} description={result.background} />
          </Grid>
        ))}
      </Grid>
    );
  }


  return (
    <Container
      disableGutters
      maxWidth='lg'
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {!!data && (
        <Box
          sx={{
            pl: 2,
            width: { xs: 300, sm: 552, md: 836, lg: 1200, xl: 1200 },
          }}
        >
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
            spacing={2}
            sx={{ justifyItems: "center", alignContent: "center" }}
          >
            {fullResponseResult.map((result) => (
              <Box key={result.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GridViewCard fullResponseResult={result} image={result.thumbnailURL} title={result.name} description={result.background} {...props} />
              </Box>
            ))}
          </Masonry>
        </Box>
      )}
    </Container>
  );
}

