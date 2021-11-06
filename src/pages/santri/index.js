import React, { useEffect, useState } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
<<<<<<< HEAD:src/pages/santri/index.js
import { axiosMain } from '../../axiosInstances';
=======
import { useState } from "react";
import { axiosMain } from "../../axiosInstances";
>>>>>>> 868ae1b (before rebasing):src/pages/santri/index.jsx

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps() {
  var santris = [];
  await axiosMain
    .get("santri/search?page=0&n=10")
<<<<<<< HEAD:src/pages/santri/index.js
    .then(response => {

      santris = response.data.result

    })
    .catch(e => {

      santris = "error"
    })
  return {
    props: {
      santris: santris,
=======
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
>>>>>>> 868ae1b (before rebasing):src/pages/santri/index.jsx
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

  const handleChange = async (qpage, qsearchTerm, qvalue) => {
    axiosMain
<<<<<<< HEAD:src/pages/santri/index.js
      .get(`santri/search?page=${qpage}&n=${qvalue}&name=${qsearchTerm}`)
      .then(response => {
        setSantris(response.data.result)
      })
      .catch(e => {
        setSantris("error")
=======
      .get(`santri/search?page=${page}&n=${value}&name=${searchTerm}`)
      .then((response) => {
        setSantris(response.data.result);
>>>>>>> 868ae1b (before rebasing):src/pages/santri/index.jsx
      })
      .catch((e) => {
        setSantris("error");
      });
  };

  useEffect(() => {
    if (page != 0 || searchTerm !== "" || value != 10) {
<<<<<<< HEAD:src/pages/santri/index.js
      handleChange(page, searchTerm, value)
=======
      handleChange(page, searchTerm, value);
>>>>>>> 868ae1b (before rebasing):src/pages/santri/index.jsx
    } else {
      setSantris(props.santris);
    }
  }, [page, searchTerm, value, props.santris]);

<<<<<<< HEAD:src/pages/santri/index.js

  if (santris === "error") {
    return (
      <p>There seems to be a problem with data fetching</p>
    )
  } else if (santris.length == 0) {
    return (
      <p>Loading...</p>
    )
=======
  if (santriSort === "error") {
    return <p>There seems to be a problem with data fetching</p>;
  } else if (santriSort.length == 0) {
    return <p>Loading...</p>;
>>>>>>> 868ae1b (before rebasing):src/pages/santri/index.jsx
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
<<<<<<< HEAD:src/pages/santri/index.js
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
=======
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
>>>>>>> 868ae1b (before rebasing):src/pages/santri/index.jsx
      </ShowAllTemplate>
    );
  }
}
