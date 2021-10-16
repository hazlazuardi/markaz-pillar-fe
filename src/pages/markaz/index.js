import React from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

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
  const { markaz } = props;
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState(10);

  {console.log("markaz", markaz)}
  if (markaz.length == 0) {
    return <p>Loading...</p>;
  } else {
    return (
      <ShowAllTemplate
        searchBarName=" Cari Markaz"
        markazOrSantri="Markaz"
        page={page}
        setPage={setPage}
        value={value}
        setValue={setValue}
        setSearchTerm={setSearchTerm}
      >
        {markaz
          .filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => (
            <Card
              key={val.id}
              id={val.id}
              image={val.thumbnailURL}
              name={val.name}
              desc={val.background}
              intr_1="Donasi"
              intr_2="Lihat Detail"
              markazOrSantri="markaz"
              detail="markaz"
            />
          ))}
      </ShowAllTemplate>
    );
  }
}
