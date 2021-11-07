import React from "react";
import Card from "../../modules/Card";
import Grid from "@mui/material/Grid";

export default function GridView(props) {
  const { data, markazOrSantri, intr1Butt, detail, handleDelete } = props;
  // array of objects
  const users = data.result;

  return (
    <Grid
      container
      spacing={3}
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {users.map((user) => (
        <Card
          key={user.id}
          name={user.name}
          image={user.thumbnailURL}
          desc={user.background}
          intr_1="edit"
          intr_2="delete"
          markazOrSantri={markazOrSantri}
          id={user.id}
          intr1Butt={intr1Butt}
          detail={detail}
          handleDelete={handleDelete}
        />
      ))}
    </Grid>
  );
}
