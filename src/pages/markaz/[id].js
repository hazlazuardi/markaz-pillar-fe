import React, { useState, useEffect } from "react";
import DetailView from '../../component/templates/DetailView'
import { axiosMain } from '../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../component/modules/ArrowBack";
import ProgressDonasiFooter from "../../component/modules/ProgressDonasiFooter"
import { markazCategory } from "../../context/AppReducer";
import { Stack } from "@mui/material";
import AppContext from '../../context/AppContext'

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function MarkazDetail(props) {
  const { detailMarkaz } = props
  const router = useRouter();
  const { id } = router.query
  const { data: responseDetailMarkaz, error } = useSWR(router.isReady ? `/markaz?id=${id}` : null,
    fetcher,
    { fallbackData: detailMarkaz, refreshInterval: 10000 }
  )


  const dataResult = {
    ...responseDetailMarkaz.result
  }
  console.log(dataResult)
  const convertedDataMarkaz = {
    title: dataResult.name,
    description: dataResult.background,
    image: dataResult.thumbnailURL,
    details: [
      {
        subtitle: "Contact Name",
        detail: dataResult.contactName
      },
      {
        subtitle: "Category",
        detail: markazCategory[dataResult.category]
      },
      {
        subtitle: "Contact Info",
        detail: dataResult.contactInfo
      },
      {
        subtitle: "Alamat",
        detail: dataResult.address
      },
    ],
    donation: [
      {
        subtitle: "Nominal yang dibutuhkan",
        detail: dataResult.nominal
      },
    ],
    progress: dataResult.progress
  }

  const convertedData = {
    ...responseDetailMarkaz,
    result: {
      ...dataResult,
      ...convertedDataMarkaz
    }
  }

  // useEffect(() => {
  //   if (!!responseDetailMarkaz) {
  //     setMarkaz(responseDetailMarkaz.result);

  //   }
  // }, [responseDetailMarkaz])

  if (error) return "An error has occurred.";
  if (!responseDetailMarkaz) return "Loading...";
  return (
    <>
      <ArrowBack href='/markaz' />
      <DetailView variant='markaz' data={convertedData} hrefDonasi={`/markaz/donasi/${id}`} />
      <ProgressDonasiFooter data={convertedData} />
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const staticDetailMarkazResponse = await axiosMain.get(`/markaz?id=${id}`)
  const staticDetailMarkaz = staticDetailMarkazResponse.data
  return {
    props: {
      detailMarkaz: staticDetailMarkaz,
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const staticAllMarkazResponse = await axiosMain.get(`/markaz/search?n=1000`)
  const staticAllMarkaz = await staticAllMarkazResponse.data

  const paths = await staticAllMarkaz.result.map((markaz) => ({
    params: { id: markaz.id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

