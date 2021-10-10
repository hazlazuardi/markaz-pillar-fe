import React, { useEffect, useCallback } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { useState } from 'react';

const BASE_URL = process.env.BACKEND_HOST;


export default function SantriLayout(props) {
  const [page, setPage] = useState(0)

  const [searchTerm, setSearchTerm] = useState("")

  const [value, setValue] = useState(10);

  const [data, setData] = useState([])

  const getData =
    useCallback(
      () => {
        async (event) => {
          await fetch(`${BASE_URL}/santri/search?page=${page}&n=${value}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            }
          }).then(preResponse => {
            preResponse.json().then(data => {
              setData(data.result)
            })
            console.log(data)
          })
        }
      },
      [data, page, value],
    )
  useEffect(() => {
    getData()
  }, [getData])

  if (data.length == 0) {
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
        {data.filter(val => {
          if (searchTerm == "") {
            return val
          } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
          }
        }).map((val, key) => (
          <Card
            key={val.id}
            image={val.thumbnailURL}
            name={val.name}
            desc={val.background}
            intr_1="Donasi"
            intr_2="Lihat Detail"
          />
        ))}
      </ShowAllTemplate>
    );
  }
}
