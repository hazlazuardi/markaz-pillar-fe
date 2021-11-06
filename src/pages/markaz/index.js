import React, { useEffect, useCallback } from "react";
import ShowAllTemplate from "../../component/templates/show_all/ShowAll";
import Card from "../../component/modules/Card";
import { useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps({}) {
  const response = await fetch(`${BASE_URL}/markaz/search`);
  const data = await response.json();
  const markaz = data.result;

  const responseSortDesc = await fetch(
    `${BASE_URL}/markaz/search?sortedName=DESC`
  );
  const dataDesc = await responseSortDesc.json();
  const markazDesc = dataDesc.result;

  // console.log("response", responseSortDesc)
  // console.log("data", dataDesc)
  // console.log("markaz", markazDesc)

  const responseSortAsc = await fetch(
    `${BASE_URL}/markaz/search?sortedName=ASC`
  );
  const dataAsc = await responseSortAsc.json();
  const markazAsc = dataAsc.result;

  const responseFilterLocationFalse = await fetch(
    `${BASE_URL}/markaz/search?address=false`
  );
  const dataLocationFalse = await responseFilterLocationFalse.json();
  const markazLocationFalse = dataLocationFalse.result;

  const responseFilterLocationTrue = await fetch(
    `${BASE_URL}/markaz/search?address=true`
  );
  const dataLocationTrue = await responseFilterLocationTrue.json();
  const markazLocationTrue = dataLocationTrue.result;

  const responseFilterCategoryPembangunan = await fetch(
    `${BASE_URL}/markaz/search?category=PEMBANGUNAN_MARKAZ`
  );
  const dataCategoryPembangunan =
    await responseFilterCategoryPembangunan.json();
  const markazCategoryPembangunan = dataCategoryPembangunan.result;

  console.log("response", responseFilterCategoryPembangunan)
  console.log("data", dataCategoryPembangunan)
  console.log("markaz", markazCategoryPembangunan)

  const responseFilterCategoryRenovasi = await fetch(
    `${BASE_URL}/markaz/search?category=RENOVASI`
  );
  const dataCategoryRenovasi = await responseFilterCategoryRenovasi.json();
  const markazCategoryRenovasi = dataCategoryRenovasi.result;

  const responseFilterCategoryPenambahan = await fetch(
    `${BASE_URL}/markaz/search?category=PENAMBAHAN_FASILITAS`
  );
  const dataCategoryPenambahan = await responseFilterCategoryPenambahan.json();
  const markazCategoryPenambahan = dataCategoryPenambahan.result;

  const responseFilterCategoryPembangunanRenovasi = await fetch(
    `${BASE_URL}/markaz/search?category=PEMBANGUNAN_MARKAZ&category=RENOVASI`
  );
  const dataCategoryPembangunanRenovasi =
    await responseFilterCategoryPembangunanRenovasi.json();
  const markazCategoryPembangunanRenovasi =
    dataCategoryPembangunanRenovasi.result;

  const responseFilterCategoryPembangunanPenambahan = await fetch(
    `${BASE_URL}/markaz/search?category=PEMBANGUNAN_MARKAZ&category=PENAMBAHAN_FASILITAS`
  );
  const dataCategoryPembangunanPenambahan =
    await responseFilterCategoryPembangunanPenambahan.json();
  const markazCategoryPembangunanPenambahan =
    dataCategoryPembangunanPenambahan.result;

  const responseFilterCategoryRenovasiPenambahan = await fetch(
    `${BASE_URL}/markaz/search?category=RENOVASI&category=PENAMBAHAN_FASILITAS`
  );
  const dataCategoryRenovasiPenambahan =
    await responseFilterCategoryRenovasiPenambahan.json();
  const markazCategoryRenovasiPenambahan =
    dataCategoryRenovasiPenambahan.result;

  const responseFilterCategoryAll = await fetch(
    `${BASE_URL}/markaz/search?category=PEMBANGUNAN_MARKAZ&category=RENOVASI&category=PENAMBAHAN_FASILITAS`
  );
  const dataCategoryAll = await responseFilterCategoryAll.json();
  const markazCategoryAll = dataCategoryAll.result;

  return {
    props: {
      markaz: markaz,
      markazDesc: markazDesc,
      markazAsc: markazAsc,
      markazLocationFalse: markazLocationFalse,
      markazLocationTrue: markazLocationTrue,
      markazCategoryPembangunan: markazCategoryPembangunan,
      markazCategoryRenovasi: markazCategoryRenovasi,
      markazCategoryPenambahan: markazCategoryPenambahan,
      markazCategoryPembangunanRenovasi: markazCategoryPembangunanRenovasi,
      markazCategoryPembangunanPenambahan: markazCategoryPembangunanPenambahan,
      markazCategoryRenovasiPenambahan: markazCategoryRenovasiPenambahan,
      markazCategoryAll: markazCategoryAll,
    },
  };
}

export default function MarkazLayout(props) {
  const {
    markaz,
    markazDesc,
    markazAsc,
    markazLocationFalse,
    markazLocationTrue,
    markazCategoryPembangunan,
    markazCategoryRenovasi,
    markazCategoryPenambahan,
    markazCategoryPembangunanRenovasi,
    markazCategoryPembangunanPenambahan,
    markazCategoryRenovasiPenambahan,
    markazCategoryAll,
  } = props;

  const filter = {
    sort: [markazDesc, markazAsc],
    location: [markazLocationFalse, markazLocationTrue],
    category: [
      markazCategoryPembangunan,
      markazCategoryRenovasi,
      markazCategoryPenambahan,
      markazCategoryPembangunanRenovasi,
      markazCategoryPembangunanPenambahan,
      markazCategoryRenovasiPenambahan,
      markazCategoryAll,
    ],
  };

  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [markazSort, setMarkazSort] = useState(markaz);

  const [value, setValue] = useState(10);

  // useEffect(() => {
  //   function handleChange() {

  //   } 

  // }, [props.markazAsc,])

  // {
  //   console.log("markaz1", markazCategoryPembangunan);
  //   console.log("markaz2", markazCategoryRenovasi);
  //   console.log("markaz3", markazCategoryPenambahan);
  // }
  // if (markazSort.length == 0) {
  //   return <p>Loading...</p>;
  // } else {
    return (
      <ShowAllTemplate
        searchBarName="Cari Markaz"
        markazOrSantri="Markaz"
        page={page}
        setPage={setPage}
        value={value}
        setValue={setValue}
        setSearchTerm={setSearchTerm}
        setSort={setMarkazSort}
        filter={filter}
      >
        {markazSort
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
// }
