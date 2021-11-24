import React, { useState, useEffect } from "react";
import DetailView from '../../../../component/templates/DetailView'
import { axiosMain } from '../../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../../component/modules/ArrowBack";
import ProgresDonasiFooter from "../../../../component/modules/ProgresDonasiFooter"
import { enumRoutes, markazCategory } from "../../../../context/AppReducer";
import Add from "@mui/icons-material/Add";
import { DonutLarge } from "@mui/icons-material";
import { Typography } from '@mui/material'

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);
export default function AdminMarkazDetail(props) {
  const router = useRouter();
  const { markaz_id } = router.query
  const { data: responseDetailAdminMarkaz, error, mutate } = useSWR(router.isReady ? `/markaz?id=${markaz_id}` : null,
    fetcher,
    // { fallbackData: detailAdminMarkaz, refreshInterval: 10000 }
  );

  const deleteProgress = async (id) => {
    return axiosMain.delete(`/admin/donation/progress?id=${id}`);
  };

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
              subtitle: "Contact Name",
              detail: dataResult.contactName,
            },
            {
              subtitle: "Category",
              detail: markazCategory[dataResult.category],
            },
            {
              subtitle: "Contact Person",
              detail: dataResult.contactPerson,
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
          name: "Update Progress Donasi",
          icon: <DonutLarge />,
          onClick: hrefUpdateProgresDonasi
        },
        {
          name: "Create Donasi",
          icon: <Add />,
          onClick: enumRoutes.ADMIN_MARKAZ_DONASI_CREATE
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

  if (error) return (
    <>
      <ArrowBack href={enumRoutes.ADMIN_MARKAZ} />
      <Typography variant="p" color="initial">An error has occured</Typography>
    </>
  );
  if (!responseDetailAdminMarkaz) return "Loading...";
  return (
    <>
      <ArrowBack href={enumRoutes.ADMIN_MARKAZ} />
      <DetailView isAdmin variant='markaz' data={convertedData} speedDialActions={adminMarkazDetailActions} hrefDonasi={enumRoutes.ADMIN_MARKAZ_DONASI} disableDonasi={!!convertedData && !convertedData.result.nominal} />
      <ProgresDonasiFooter isAdmin variant='markaz' data={convertedData} apiCall={deleteProgress} mutate={mutate} />
    </>
  );
}
