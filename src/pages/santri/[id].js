import React, { useState, useEffect } from "react";
import DetailView from '../../component/templates/DetailView'
import { axiosMain } from '../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../component/modules/ArrowBack";
import ProgressDonasiFooter from "../../component/modules/ProgressDonasiFooter"
import { markazCategory } from "../../context/AppReducer";
import { Stack } from "@mui/material";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function DetailSantri(props) {
  const { detailSantri } = props
  const router = useRouter();
  const { id } = router.query
  const { data: responseDetailSantri, error } = useSWR(router.isReady ? `/santri?id=${id}` : null,
    fetcher,
    { fallbackData: detailSantri, refreshInterval: 10000 }
  )

  const dataResult = {
    ...responseDetailSantri.result
  }
  const convertedDataSantri = {
    title: dataResult.name,
    description: dataResult.background,
    image: dataResult.thumbnailURL,
    details: [
      {
        subtitle: "Tempat Markaz",
        detail: dataResult.markaz.name
      },
      {
        subtitle: "Jenis Kelamin",
        detail: dataResult.gender
      },
      {
        subtitle: "Domisili Asal",
        detail: dataResult.birthPlace
      },
      {
        subtitle: "Kebutuhan Beasiswa",
        detail: dataResult.desc
      },
      {
        subtitle: "Tempat & Tanggal Lahir",
        detail: `${dataResult.birthPlace}, ${dataResult.birthDate}`
      },

    ],
    donation: [
      {
        subtitle: "Nominal yang dibutuhkan",
        detail: dataResult.nominal
      },
    ]
  }

  const convertedData = {
    ...responseDetailSantri,
    result: {
      ...convertedDataSantri
    }
  }

  // useEffect(() => {
  //   if (!!responseDetailSantri) {
  //     setMarkaz(responseDetailSantri.result);

  //   }
  // }, [responseDetailSantri])
  
  if (error) return "An error has occurred.";
  if (!responseDetailSantri) return "Loading...";
  return (
    <>
      <ArrowBack href='/santri' />
      <DetailView variant='santri' data={convertedData} />
      <ProgressDonasiFooter />
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const staticDetailSantriResponse = await axiosMain.get(`/santri?id=${id}`)
  const staticDetailSantri = staticDetailSantriResponse.data
  return {
    props: {
      detailSantri: staticDetailSantri,
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const staticAllSantriResponse = await axiosMain.get(`/santri/search?n=1000`)
  const staticAllSantri = await staticAllSantriResponse.data

  const paths = await staticAllSantri.result.map((santri) => ({
    params: { id: santri.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

