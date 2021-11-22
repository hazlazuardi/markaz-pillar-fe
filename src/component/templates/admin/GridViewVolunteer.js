import React from "react";
import Card from "../../modules/Card";
import Grid from "@mui/material/Grid";
import GridViewCard from "../../modules/GridViewCard";
import ActivityCard from "../../modules/ActivityCard";
import Masonry from "@mui/lab/Masonry";
import { Box } from "@mui/system";
import { Container, useMediaQuery } from "@mui/material";

<<<<<<< HEAD
export default function GridViewVolunteer(props) {
  const { data, markazOrSantri, intr1Butt, detail, handleDelete, pageType } = props;
=======
export default function GridView(props) {
  const { data, markazOrSantri, intr1Butt, detail, handleDelete } = props;
>>>>>>> 1a8877e (feat: add gridview daftar kegiatan)
  // array of objects
  const fullResponseResult = data.result;

  //   return (
  //     <Grid
  //       container
  //       spacing={3}
  //       sx={{ display: "flex", justifyContent: "center" }}
  //     >
  //       {fullResponseResult.map((result) => (
  //         <Grid item key={result.id}>
  //           <GridViewCard image={result.thumbnailURL} title={result.name} description={result.background} />
  //         </Grid>
  //       ))}
  //     </Grid>
  //   );
  // }

  return (
    <Container
      disableGutters
      maxWidth={1200}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      {!!data && (
        <Box
          sx={{
            pl: 2,
            width: { xs: 300, sm: 552, md: 836, lg: 1200, xl: 1200 },
          }}
        >
            {fullResponseResult.map((result) => (
              <Box
                key={result.id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <GridViewCard fullResponseResult={result} image={result.thumbnailURL} title={result.name} description={result.background} /> */}
                <ActivityCard
                  type={"Donasi"}
                  name= "name"
                  ktp= "317400000"
                  email= "yahoo@gmail.com"
                  telp = "083553420"
                  alamat = "Jl. Tebet timur"
                  thumbnail = "url"
<<<<<<< HEAD
                  pageType={pageType}
=======
                  pageType={"daftar kegiatan"}
>>>>>>> 1a8877e (feat: add gridview daftar kegiatan)
                />
              </Box>
            ))}
        </Box>
      )}
    </Container>
  );
}

{
  /* <GridViewCard
key={result.id}
name={result.name}
image={result.thumbnailURL}
desc={result.background}
intr_1="edit"
intr_2="delete"
markazOrSantri={markazOrSantri}
id={result.id}
intr1Butt={intr1Butt}
detail={detail}
handleDelete={handleDelete}
/> */
}