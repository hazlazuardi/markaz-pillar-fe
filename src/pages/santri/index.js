import React, { useEffect, useState } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { axiosMain } from '../../axiosInstances';


export async function getStaticProps() {
  var santris = [];
  await axiosMain
    .get("santri/search?page=0&n=10")
    .then(response => {

      santris = response.data.result

    })
    .catch(e => {

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


  const handleChange = async (qpage, qsearchTerm, qvalue) => {
    axiosMain
      .get(`santri/search?page=${qpage}&n=${qvalue}&name=${qsearchTerm}`)
      .then(response => {
        setSantris(response.data.result)
      })
      .catch(e => {
        setSantris("error")
      })
  }

  useEffect(() => {
    if (page != 0 || searchTerm !== "" || value != 10) {
      handleChange(page, searchTerm, value)
    } else {
      setSantris(props.santris)
    }
  }, [page, searchTerm, value, props.santris])


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
          if (searchTerm == "" || val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
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
