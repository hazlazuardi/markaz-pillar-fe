import React, { useState, useEffect } from "react";
import DetailView from '../../../../component/templates/DetailView'
import { axiosMain } from '../../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../../component/modules/ArrowBack";
import ProgresDonasiFooter from "../../../../component/modules/ProgresDonasiFooter"
import { Stack, Typography } from "@mui/material";
import Add from "@mui/icons-material/Add";
import { DonutLarge } from "@mui/icons-material";
import { enumRoutes } from "../../../../context/AppReducer";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function AdminDetailSantri(props) {
  const router = useRouter();
  const { santri_id } = router.query
  const { data: responseDetailAdminSantri, error, mutate } = useSWR(router.isReady ? `/santri?id=${santri_id}` : null,
    fetcher,
    // { fallbackData: detailAdminSantri, refreshInterval: 10000 }
  )

  const deleteProgress = async (id) => {
    return axiosMain.delete(`/admin/donation/progress?id=${id}`)
  }

  const [convertedData, setConvertedData] = useState()
  const [hrefUpdateProgresDonasi, setHrefUpdateProgresDonasi] = useState()
  useEffect(() => {
    if (!!responseDetailAdminSantri) {
      const dataResult = responseDetailAdminSantri.result
      setConvertedData({
        ...responseDetailAdminSantri,
        result: {
          ...dataResult,
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
          progress: dataResult.progress
        }
      })
      setHrefUpdateProgresDonasi(`/admin/santri/${santri_id}/donasi/${dataResult.donationId}/progres/create`)
    } else {
      mutate()
    }
  }, [mutate, responseDetailAdminSantri, santri_id])

  const adminSantriDetailActions = [
    {
      name: "Create Donasi",
      icon: <Add />,
      onClick: `/admin/santri/${santri_id}/donasi/create`
    }, {
      name: "Edit Progress Donasi",
      icon: <DonutLarge />,
      onClick: hrefUpdateProgresDonasi
    },
  ]

  if (error) return (<ArrowBack href={enumRoutes.ADMIN_SANTRI} />);
  if (!responseDetailAdminSantri) return (
    <>
      <ArrowBack href={enumRoutes.ADMIN_SANTRI} />
      <Typography component='p'>Loading Santri Information..</Typography>
    </>
  );
  return (
    <Stack spacing={4}>
      <ArrowBack href='/admin/santri' />
      <DetailView isAdmin variant='santri' data={convertedData} speedDialActions={adminSantriDetailActions} hrefDonasi={`/admin/santri/${santri_id}/donasi`} />
      <ProgresDonasiFooter isAdmin variant='santri' data={convertedData} apiCall={deleteProgress} mutate={mutate} />
    </Stack>
  );
}
