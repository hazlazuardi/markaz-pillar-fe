import React from "react";
import ShowAllTemplate from "../show_all/ShowAll";
import Card from "../../modules/Card";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export default function GridView(props) {
  const { data, markazOrSantri, intr1Butt, detail } = props;
  // array of objects
  const users = data.result;
  console.log(data.result);
  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid item lg={4} md={4} sm={6}>
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
          />
        </Grid>
      ))}
    </Grid>
  );
}
