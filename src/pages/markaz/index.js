import React, { useState, useEffect, useCallback } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps() {
  
  var markazs = [];
  await axiosMain
    .get("markaz/search?page=0&n=10")
    .then((response) => {
      markazs = response.data.result;
    })
    .catch((e) => {
      markazs = "error";
    });


  return {
    props: {
      markazs: markazs,
    },
  };
}

const fetcher = (url) =>
  axiosMain.get(url).then((res) => {
    console.log(res);
    return res.data;
  });

export default function MarkazLayout(props) {
  const {
    markazs,
  } = props;

  const [locationFilter, setLocationFilter] = useState();

  const [nameFilter, setNameFilter] = useState();

  const [categoryFilter, setCategoryFilter] = useState();

  const {
    data: allMarkaz,
    error,
    mutate,
  } = useSWR(
    `/markaz/search?${!!locationFilter ? "address=" + locationFilter : ""}${
      !!nameFilter ? "sortedName=" + nameFilter : ""
    }${!!categoryFilter ? "category=" + categoryFilter : ""}`,
    fetcher
  );

  useEffect(() => {
    mutate();
  }, [locationFilter, nameFilter]);


  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState(10);


  if (error) return "An error has occurred.";
  if (!allMarkaz) return "Loading...";
  return (
    <ShowAllTemplate
      searchBarName="Cari Markaz"
      markazOrSantri="Markaz"
      page={page}
      setPage={setPage}
      value={value}
      setValue={setValue}
      setSearchTerm={setSearchTerm}
      locationFilter={locationFilter}
      setLocationFilter={setLocationFilter}
      nameFilter={nameFilter}
      setNameFilter={setNameFilter}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      mutate={mutate}
    >

      {!!allMarkaz &&
        allMarkaz.result.map((val, key) => (
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
// }
