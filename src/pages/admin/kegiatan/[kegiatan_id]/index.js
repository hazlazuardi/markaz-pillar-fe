import React from "react";
import DetailView from "../../../../component/templates/DetailView";
import { axiosMain } from '../../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { Button } from "@mui/material";
import Link from 'next/link'
import TestimoniKegiatanFooter from "../../../../component/modules/TestimoniKegiatanFooter";
import Add from "@mui/icons-material/Add";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function DetailKegiatan(props) {
    const { detailMarkaz } = props
    const router = useRouter();
    const { kegiatan_id } = router.query
    const { data: responseDetailKegiatan, error, mutate } = useSWR(router.isReady ? `/volunteer?id=${kegiatan_id}` : null,
        fetcher,
        { fallbackData: detailMarkaz, refreshInterval: 10000 }
    )

    const dataResult = {
        ...responseDetailKegiatan.result
    }
    const convertedDataMarkaz = {
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

    const convertedData = {
        ...responseDetailKegiatan,
        result: {
            ...dataResult,
            ...convertedDataMarkaz
        }
    }

    // useEffect(() => {
    //   if (!!responseDetailKegiatan) {
    //     setMarkaz(responseDetailKegiatan.result);

    //   }
    // }, [responseDetailKegiatan])

    const DaftarKegiatanCTA = () => {
        return (
            <>
                <Link href='/volunteer/register' passHref>
                    <Button variant='contained' >Daftar Sekarang</Button>
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
            onClick: `/admin/kegiatan/${kegiatan_id}/relawan`
        },
        {
            name: "Create Testimoni",
            icon: <Add />,
            onClick: `/admin/kegiatan/${kegiatan_id}/testimoni/create`
        },
    ]


    if (error) return "An error has occurred.";
    if (!responseDetailKegiatan) return "Loading...";
    return (
        <>
            <ArrowBack href='/admin/kegiatan' />
            <DetailView isAdmin disableDonasi CTA={<DaftarKegiatanCTA />} variant='markaz' data={convertedData} hrefDonasi={`/markaz/${kegiatan_id}/donasi`} speedDialActions={AdminDetailKegiatanActions} />
            <TestimoniKegiatanFooter isAdmin data={convertedData} mutate={mutate} apiCall={deleteTestimoni} />
        </>
    );
}

export async function getStaticProps(context) {
    const id = context.params.kegiatan_id;
    const staticDetailMarkazResponse = await axiosMain.get(`/volunteer?id=${id}`)
    const staticDetailMarkaz = staticDetailMarkazResponse.data
    return {
        props: {
            detailMarkaz: staticDetailMarkaz,
        },
        revalidate: 10
    };
}

export async function getStaticPaths() {
    const staticAllMarkazResponse = await axiosMain.get(`/volunteer`)
    const staticAllMarkaz = await staticAllMarkazResponse.data

    const paths = await staticAllMarkaz.result.map((markaz) => ({
        params: { kegiatan_id: markaz.id.toString() },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}

