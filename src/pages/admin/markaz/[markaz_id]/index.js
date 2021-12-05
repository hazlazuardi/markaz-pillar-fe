import React, { useState, useEffect } from "react";
import DetailView from '../../../../component/templates/DetailView'
import { axiosMainAuth } from '../../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../../component/modules/ArrowBack";
import ProgresDonasiFooter from "../../../../component/modules/ProgresDonasiFooter"
import { enumRoutes, markazCategory } from "../../../../context/AppReducer";
import Add from "@mui/icons-material/Add";
import { DonutLarge } from "@mui/icons-material";
import { Typography } from '@mui/material'

const fetcher = (url) => axiosMainAuth.get(url).then((res) => res.data);
export default function AdminMarkazDetail(props) {
  const router = useRouter();
  const { markaz_id } = router.query
  const { data: responseDetailAdminMarkaz, error, mutate } = useSWR(router.isReady ? `/markaz?id=${markaz_id}` : null,
    fetcher,
    // { fallbackData: detailAdminMarkaz, refreshInterval: 10000 }
  );

  const deleteProgress = async (id) => {
    return axiosMainAuth.delete(`/admin/donation/progress?id=${id}`);
  };

  const deleteMarkaz = async (id) => {
    return axiosMainAuth.delete(`/admin/markaz?id=${id}`)
  }

  const [convertedData, setConvertedData] = useState()
  const [hrefUpdateProgresDonasi, setHrefUpdateProgresDonasi] = useState("")
  useEffect(() => {
    if (!!responseDetailAdminMarkaz) {
      const dataResult = responseDetailAdminMarkaz.result;
      setConvertedData({
        ...responseDetailAdminMarkaz,
        result: {
          ...dataResult,
          title: dataResult.name,
          description: dataResult.background,
          image: dataResult.thumbnailURL,
          details: [
            {
              subtitle: "Kategori",
              detail: dataResult.category.split("_").join(" ").toLowerCase(),
            },
            {
              subtitle: "Contact Person",
              detail: dataResult.contactInfo,
            },
            {
              subtitle: "Contact Name",
              detail: dataResult.contactName,
            },
            {
              subtitle: "Alamat",
              detail: dataResult.contactInfo,
            },
          ],
          donation: [
            {
              subtitle: "Nominal yang dibutuhkan",
              detail: dataResult.nominal,
            },
          ],
          progress: dataResult.progress
        }
      })
      setHrefUpdateProgresDonasi(`${enumRoutes.ADMIN_MARKAZ_DONASI}/${dataResult.donationId}/progres/create`)
    } else {
      mutate();
    }

  }, [hrefUpdateProgresDonasi, markaz_id, mutate, responseDetailAdminMarkaz])

  const [adminMarkazDetailActions, setAdminMarkazDetailActions] = useState()
  useEffect(() => {
    if (!!convertedData && convertedData.result.nominal) {
      setAdminMarkazDetailActions([
        {
          name: "Create Donasi",
          icon: <Add />,
          onClick: enumRoutes.ADMIN_MARKAZ_DONASI_CREATE
        },
        {
          name: "Update Progress Donasi",
          icon: <DonutLarge />,
          onClick: hrefUpdateProgresDonasi
        },
      ])
    } else {
      setAdminMarkazDetailActions([
        {
          name: "Create Donasi",
          icon: <Add />,
          onClick: enumRoutes.ADMIN_MARKAZ_DONASI_CREATE
        },
      ])
    }

  }, [convertedData, hrefUpdateProgresDonasi, markaz_id])

  if (error) return (<ArrowBack href={enumRoutes.ADMIN_MARKAZ} />);
  if (!responseDetailAdminMarkaz) return (
    <>
      <ArrowBack href={enumRoutes.ADMIN_MARKAZ} />
      <Typography component='p'>Loading Markaz Information..</Typography>
    </>
  );
  return (
    <>
      <ArrowBack href={enumRoutes.ADMIN_MARKAZ} />
      <DetailView isAdmin variant='markaz' data={convertedData} deleteApiCall={deleteMarkaz} speedDialActions={adminMarkazDetailActions} hrefDonasi={enumRoutes.ADMIN_MARKAZ_DONASI} disableDonasi={!!convertedData && !convertedData.result.nominal} />
      <ProgresDonasiFooter isAdmin variant='markaz' data={convertedData} apiCall={deleteProgress} mutate={mutate} />
    </>
  );
}
