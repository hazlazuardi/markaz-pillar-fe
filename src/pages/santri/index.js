import React, { useEffect, useState } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps() {
  var santris = [];
  await axiosMain
    .get("santri/search?page=0&n=10")
    .then((response) => {
      // console.log(response);
      santris = response.data.result;
    })
    .catch((e) => {
      // console.log(e.response);
      santris = "error";
    });
  
  return {
    props: {
      santris: santris,
    },
  };
}

const fetcher = (url) =>
  axiosMain.get(url).then((res) => {
    console.log(res);
    return res.data;
  });

export default function SantriLayout(props) {

  const [page, setPage] = useState(0);

  const [checked, setChecked] = React.useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState(10);

  const [santris, setSantris] = useState([]);

  const [ageFilter, setAgeFilter] = useState();

  const [nameFilter, setNameFilter] = useState();

  const {
    data: allSantri,
    error,
    mutate,
  } = useSWR(
    `/santri/search?${!!ageFilter ? "sortedAge=" + ageFilter : ""}${
      !!nameFilter ? "sortedName=" + nameFilter : ""
    }`,
    fetcher
  );

  useEffect(() => {
    mutate();
  }, [ageFilter, nameFilter]);

  if (error) return "An error has occurred.";
  if (!allSantri) return "Loading...";
  return (
    <ShowAllTemplate
      searchBarName=" Cari Santri"
      markazOrSantri="Santri"
      page={page}
      setPage={setPage}
      value={value}
      setValue={setValue}
      setSearchTerm={setSearchTerm}
      ageFilter={ageFilter}
      setAgeFilter={setAgeFilter}
      nameFilter={nameFilter}
      setNameFilter={setNameFilter}
      mutate={mutate}
    >
      {!!allSantri &&
        allSantri.result.map((val, key) => (
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
