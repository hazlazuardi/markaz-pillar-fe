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
export default function AdminDetailSantri(props) {
  const { detailAdminSantri } = props
  const router = useRouter();
  const { id } = router.query
  const { data: responseDetailAdminSantri, error } = useSWR(router.isReady ? `/santri?id=${id}` : null,
    fetcher,
    { fallbackData: detailAdminSantri, refreshInterval: 10000 }
  )

  const dataResult = {
    ...responseDetailAdminSantri.result
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
    ...responseDetailAdminSantri,
    result: {
      ...convertedDataSantri
    }
  }

  const adminMarkazDetailActions = [
    {
      name: "Create Donasi",
      icon: <Add />,
      onClick: '/admin/santri/donasi/create'
    }, {
      name: "Edit Progress Donasi",
      icon: <DonutLarge />,
      onClick: '/admin/markaz/donasi/create'
    },
  ]

  if (error) return "An error has occurred.";
  if (!responseDetailAdminSantri) return "Loading...";
  return (
    <Stack spacing={4}>
      <ArrowBack href='/santri' />
      <DetailView isAdmin variant='santri' data={convertedData} speedDialActions={adminMarkazDetailActions} />
      <ProgressDonasiFooter isAdmin />
    </Stack>
  );
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const staticDetailSantriResponse = await axiosMain.get(`/santri?id=${id}`)
  const staticDetailSantri = staticDetailSantriResponse.data
  return {
    props: {
      detailAdminSantri: staticDetailSantri,
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

