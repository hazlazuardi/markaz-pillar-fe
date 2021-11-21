import React, { useState, useEffect } from "react";
import DetailView from '../../../component/templates/DetailView'
import { axiosMain } from '../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../component/modules/ArrowBack";
import ProgressDonasiFooter from "../../../component/modules/ProgressDonasiFooter"
import { markazCategory } from "../../../context/AppReducer";
import { Stack } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { DonutLarge } from "@mui/icons-material";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function AdminMarkazDetail(props) {
  const { detailAdminMarkaz } = props
  const router = useRouter();
  const { id } = router.query
  const { data: responseDetailAdminMarkaz, error } = useSWR(router.isReady ? `/markaz?id=${id}` : null,
    fetcher,
    { fallbackData: detailAdminMarkaz, refreshInterval: 10000 }
  )

  const dataResult = {
    ...responseDetailAdminMarkaz.result
  }
  const convertedDataAdminMarkaz = {
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
        subtitle: "Contact Person",
        detail: dataResult.contactPerson
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
    ...responseDetailAdminMarkaz,
    result: {
      ...convertedDataAdminMarkaz
    }
  }
  
  const adminMarkazDetailActions = [
    {
      name: "Create Donasi",
      icon: <Add />,
      onClick: '/admin/markaz/donasi/create'
    },    {
      name: "Edit Progress Donasi",
      icon: <DonutLarge />,
      onClick: '/admin/markaz/donasi/create'
    },
  ]


  if (error) return "An error has occurred.";
  if (!responseDetailAdminMarkaz) return "Loading...";
  return (
    <>
      <ArrowBack href='/admin/markaz' />
      <DetailView isAdmin variant='markaz' data={convertedData} speedDialActions={adminMarkazDetailActions} />
      <ProgressDonasiFooter isAdmin />
    </>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const staticDetailMarkazResponse = await axiosMain.get(`/markaz?id=${id}`)
  const staticDetailMarkaz = staticDetailMarkazResponse.data
  return {
    props: {
      detailAdminMarkaz: staticDetailMarkaz,
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

