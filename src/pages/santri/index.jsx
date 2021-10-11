import React, { useEffect, useCallback } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { useState } from 'react';

const BASE_URL = process.env.BACKEND_HOST;

export async function getStaticProps({}) {
  const response = await fetch(`${BASE_URL}/santri/search`);
  const data = await response.json();
  const santris = data.result;
  return {
    props: {
      santris: santris,
    },
  };
}

export default function SantriLayout(props) {
  const {santris} = props
  const [page, setPage] = useState(0)

  const [searchTerm, setSearchTerm] = useState("")

  const [value, setValue] = useState(10);

  
  if (santris.length == 0) {
    return (
      <p>Loading...</p>
    )
  } else {
    return (
      <ShowAllTemplate
        searchBarName=" Cari Santri"
        markazOrSantri="Santri"
        page={page}
        setPage={setPage}
        value={value}
        setValue={setValue}
        setSearchTerm={setSearchTerm}
      >
        {santris.filter(val => {
          if (searchTerm == "") {
            return val
          } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
        }).map((val, key) => (
          <Card
            key={val.id}
            id={val.id}
            image={val.thumbnailURL}
            name={val.name}
            desc={val.background}
            intr_1="Donasi"
            intr_2="Lihat Detail"
            markazOrSantri="santri"
          />
        ))}
      </ShowAllTemplate>
    );
  }
}
