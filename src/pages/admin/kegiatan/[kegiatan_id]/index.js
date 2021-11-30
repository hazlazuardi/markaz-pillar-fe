import React, { useEffect, useState } from "react";
import DetailView from "../../../../component/templates/DetailView";
import { axiosMain } from '../../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { Button, Typography } from "@mui/material";
import Link from 'next/link'
import TestimoniKegiatanFooter from "../../../../component/modules/TestimoniKegiatanFooter";
import Add from "@mui/icons-material/Add";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { enumRoutes } from "../../../../context/AppReducer";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function DetailKegiatan() {
    const router = useRouter();
    const { kegiatan_id } = router.query
    const { data: responseDetailKegiatan, error, mutate } = useSWR(router.isReady ? `/volunteer?id=${kegiatan_id}` : null, fetcher)

    const [convertedData, setConvertedData] = useState()
    useEffect(() => {
        if (!!responseDetailKegiatan) {
            const dataResult = responseDetailKegiatan.result
            setConvertedData({
                ...responseDetailKegiatan,
                result: {
                    ...dataResult,
                    title: dataResult.name,
                    description: dataResult.description,
                    image: dataResult.thumbnailURL,
                    details: [
                        {
                            subtitle: "Syarat",
                            detail: dataResult.term
                        },
                        {
                            subtitle: "Manfaat",
                            detail: dataResult.benefit
                        },
                        {
                            subtitle: "Jumlah Volunteer",
                            detail: `${dataResult.volunteerApplied} / ${dataResult.volunteerNeeded}`
                        },
                        {
                            subtitle: "Jadwal",
                            detail: dataResult.schedule
                        },
                        {
                            subtitle: "Lokasi",
                            detail: dataResult.location
                        },
                    ],
                }
            })

        }

    }, [responseDetailKegiatan])

    const KelolaKegiatanCTA = () => {
        return (
            <>
                <Link href={`${enumRoutes.ADMIN_KEGIATAN}/${kegiatan_id}/relawan`} passHref>
                    <Button variant='contained'>Kelola Relawan</Button>
                </Link>
            </>
        )
    }

    const deleteTestimoni = async (id) => {
        return axiosMain.delete(`/admin/volunteer/testimony?id=${id}`)
    }

    const AdminDetailKegiatanActions = [
        {
            name: "Kelola Relawan",
            icon: <PeopleAltIcon />,
            onClick: `${enumRoutes.ADMIN_KEGIATAN}/${kegiatan_id}/relawan`
        },
        {
            name: "Create Testimoni",
            icon: <Add />,
            onClick: `${enumRoutes.ADMIN_KEGIATAN}/${kegiatan_id}/testimoni/create`
        },
    ]


    if (error) return (<ArrowBack href={enumRoutes.ADMIN_KEGIATAN} />);
    if (!responseDetailKegiatan) return (
        <>
            <ArrowBack href={enumRoutes.ADMIN_KEGIATAN} />
            <Typography component='p'>Loading Kegiatan Information..</Typography>
        </>
    );
    return (
        <>
            <ArrowBack href={enumRoutes.ADMIN_KEGIATAN} />
            <DetailView isAdmin disableDonasi CTA={<KelolaKegiatanCTA />} variant='kegiatan' data={convertedData} speedDialActions={AdminDetailKegiatanActions} />
            <TestimoniKegiatanFooter isAdmin data={convertedData} mutate={mutate} apiCall={deleteTestimoni} />
        </>
    );
}

