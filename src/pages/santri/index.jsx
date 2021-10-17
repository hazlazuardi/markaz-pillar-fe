import React, { useEffect, useCallback } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { useState } from 'react';
import { axiosMain } from '../../axiosInstances';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps({}) {
  var santris = [];
  await axiosMain
      .get("santri/search?page=0&n=10")
      .then(response => {
        console.log(response);
        santris = response.data.result
        
      })
      .catch(e => {
        console.log(e.response)
        santris = "error"
      })
    return {
      props: {
        santris: santris,
      },
    };
}

export default function SantriLayout(props) {
  const [page, setPage] = useState(0)

  const [searchTerm, setSearchTerm] = useState("")

  const [value, setValue] = useState(10);

  const [santris, setSantris] = useState([])


  const handleChange = async (page, searchTerm, value) => {
    axiosMain
      .get(`santri/search?page=${page}&n=${value}&name=${searchTerm}`)
      .then(response => {
        setSantris(response.data.result)
      })
      .catch(e => {
        setSantris("error")
      })
  }

  useEffect(() => {
    if(page != 0 || searchTerm !== "" || value != 10) {
      handleChange(page, searchTerm, value)
    } else {
      setSantris(props.santris)
    }
  }, [page, searchTerm, value])

  
  if (santris === "error") {
    return (
      <p>There seems to be a problem with data fetching</p>
    )
  } else if (santris.length == 0) {
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
            detail="santri"
          />
        ))}
      </ShowAllTemplate>
    );
  }
}
