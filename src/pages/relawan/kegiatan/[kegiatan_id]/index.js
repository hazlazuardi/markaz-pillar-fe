import React, { useEffect, useState } from "react";
import DetailView from "../../../../component/templates/DetailView";
import { axiosMain } from '../../../../axiosInstances';
import useSWR from "swr";
import { useRouter } from "next/router";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { Button } from "@mui/material";
import Link from 'next/link'


const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function DetailKegiatan(props) {
    const { detailMarkaz } = props
    const router = useRouter();
    const { kegiatan_id } = router.query
    const { data: responseDetailKegiatan, error, mutate } = useSWR(router.isReady ? `/volunteer?id=${kegiatan_id}` : null,
        fetcher,
        { fallbackData: detailMarkaz, refreshInterval: 10000 }
    )
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
        } else {
            mutate()
        }
    }, [mutate, responseDetailKegiatan])


    const DaftarKegiatanCTA = () => {
        return (
            <>
                <Link href='/volunteer/register' passHref>
                    <Button variant='contained' >Daftar Sekarang</Button>
                </Link>
            </>
        )
    }


    if (error) return "An error has occurred.";
    if (!responseDetailKegiatan) return "Loading...";
    return (
        <>
            <ArrowBack href='/relawan/kegiatan' />
            <DetailView disableDonasi CTA={<DaftarKegiatanCTA />} variant='markaz' data={convertedData} hrefDonasi={`/markaz/${kegiatan_id}/donasi`} />
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

