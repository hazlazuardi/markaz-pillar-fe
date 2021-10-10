import React from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";

const BASE_URL = process.env.BACKEND_HOST;

export async function getStaticProps({}) {
  const response = await fetch(`${BASE_URL}/markaz/search`);
  const data = await response.json();
  const markaz = data.result;
  return {
    props: {
      markaz: markaz,
    },
  };
}

export default function MarkazLayout(props) {
  return (
    <ShowAllTemplate searchBarName="Cari Markaz" markazOrSantri="Markaz">
      {props.markaz.map((key) => (
        <Card image={key.thumbnailURL} name={key.name} desc={key.background} />
      ))}
    </ShowAllTemplate>
  );
}
