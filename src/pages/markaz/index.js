import React from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Layout from "../../component/layout";
import Card from "../../component/modules/Card";
import { useState } from "react";

export default function MarkazLayout() {
  return (
    <ShowAllTemplate searchBarName="Cari Markaz" markazOrSantri="Markaz">
      <Card
        image="image"
        name="Markaz Depok"
        desc="Markaz ini dibangun pada tahun 2022"
      />
      <Card
        image="image"
        name="Markaz Sabang"
        desc="Markaz ini dibangun pada tahun 2012"
      />
      <Card
        image="image"
        name="Markaz Merauke"
        desc="Markaz ini dibangun pada tahun 2002"
      />
      <Card image="image" name="markaz 4" desc="Beautiful" />
      <Card image="image" name="Wendy" desc="Goodbye" />
      <Card image="image" name="Imagine Dragons" desc="Bad Liar" />
      <Card image="image" name="Imagine Dragons" desc="Believer" />
      <Card image="image" name="Twice" desc="Fancy You" />F
    </ShowAllTemplate>
  );
}
