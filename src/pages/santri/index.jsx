import React, { useEffect, useCallback } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { useState } from "react";
import { axiosMain } from "../../axiosInstances";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps({}) {
  var santris = [];
  await axiosMain
    .get("santri/search?page=0&n=10")
    .then((response) => {
      console.log(response);
      santris = response.data.result;
    })
    .catch((e) => {
      console.log(e.response);
      santris = "error";
    });
  const responseNameDesc = await fetch(
    `${BASE_URL}/santri/search?sortedName=DESC`
  );
  const nameDesc = await responseNameDesc.json();
  const santriNameDesc = nameDesc.result;

  const responseNameAsc = await fetch(
    `${BASE_URL}/santri/search?sortedName=ASC`
  );
  const nameAsc = await responseNameAsc.json();
  const santriNameAsc = nameAsc.result;

  const responseAgeDesc = await fetch(
    `${BASE_URL}/santri/search?sortedAge=DESC`
  );
  const ageDesc = await responseAgeDesc.json();
  const santriAgeDesc = ageDesc.result;

  const responseAgeAsc = await fetch(
    `${BASE_URL}/santri/search?sortedAge=ASC`
  );
  const ageAsc = await responseAgeAsc.json();
  const santriAgeAsc = ageAsc.result;
  return {
    props: {
      santris: santris,
      santriNameAsc: santriNameAsc,
      santriNameDesc: santriNameDesc,
      santriAgeDesc: santriAgeDesc,
      santriAgeAsc: santriAgeAsc,
    },
  };
}

export default function SantriLayout(props) {

  const {
    santriNameDesc,
    santriNameAsc,
    santriAgeDesc,
    santriAgeAsc,
  } = props;

  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState(10);

  const [santris, setSantris] = useState([]);

  const [santriSort, setSantriSort] = useState(santriNameAsc);

  const filter = {
    sort: [santriNameDesc, santriNameAsc],
    age: [santriAgeDesc, santriAgeAsc],
  };

  {
    console.log("santris", santriAgeDesc);
    console.log("santris2", santriAgeAsc);
  }

  const handleChange = async (page, searchTerm, value) => {
    axiosMain
      .get(`santri/search?page=${page}&n=${value}&name=${searchTerm}`)
      .then((response) => {
        setSantris(response.data.result);
      })
      .catch((e) => {
        setSantris("error");
      });
  };

  useEffect(() => {
    if (page != 0 || searchTerm !== "" || value != 10) {
      handleChange(page, searchTerm, value);
    } else {
      setSantris(props.santris);
    }
  }, [page, searchTerm, value, props.santris]);

  if (santriSort === "error") {
    return <p>There seems to be a problem with data fetching</p>;
  } else if (santriSort.length == 0) {
    return <p>Loading...</p>;
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
        setSort={setSantriSort}
        filter={filter}
      >
        {santriSort
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
              markazOrSantri="santri"
              detail="santri"
            />
          ))}
      </ShowAllTemplate>
    );
  }
}
