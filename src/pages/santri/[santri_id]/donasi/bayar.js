import React, { useState, useEffect, useCallback } from 'react'
import DonationForm from '../../../../component/templates/form/DonationForm'
import { useRouter } from 'next/router'
import { axiosFormData, axiosMainAuth } from "../../../../axiosInstances";
import { enumRoutes } from "../../../../context/AppReducer";
import useSWR from "swr";
import ArrowBack from '../../../../component/modules/ArrowBack';

const fetcher = url => axiosMainAuth.get(url).then(res => res.data)

export default function DonasiSantri(props) {
    const { detailSantri } = props
    const router = useRouter()
    const { santri_id } = router.query
    const { data: responseDetailSantri } = useSWR(router.isReady ? `/santri?id=${santri_id}` : null,
        fetcher,
        { fallbackData: detailSantri, refreshInterval: 10000 }
    )


    const [image, setImage] = useState();
    const [details, setDetails] = useState({
        amount: 0,
        santri: santri_id,
    });


    const checkoutSantriDonation = useCallback(async (data) => {
        return axiosFormData.post("/transaction", data)
    }, [])


    useEffect(() => {
        if (!!santri_id) {
            setDetails(prev => ({
                ...prev,
                santri: santri_id
            }))
        }
    }, [santri_id])

    return (
        <>
            <ArrowBack href={`${enumRoutes.MEMBER_SANTRI}/${santri_id}`} />
            <DonationForm
                recipient={responseDetailSantri.result.name}
                setImage={setImage}
                image={!!image && image}
                details={details}
                setDetails={setDetails}
                apiCall={checkoutSantriDonation}
                redirectURL={`${enumRoutes.MEMBER_SANTRI}/${santri_id}`}
            />
        </>
    )
}

export async function getStaticProps(context) {
    const id = context.params.santri_id;
    const staticDetailSantriResponse = await axiosMainAuth.get(`/santri?id=${id}`)
    const staticDetailSantri = staticDetailSantriResponse.data
    return {
        props: {
            detailSantri: staticDetailSantri,
        },
        revalidate: 10
    };
}

export async function getStaticPaths() {
    const staticAllSantriResponse = await axiosMainAuth.get(`/santri/search?n=1000`)
    const staticAllSantri = await staticAllSantriResponse.data

    const paths = await staticAllSantri.result.map((santri) => ({
        params: { santri_id: santri.id.toString() },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}

