import React, { useState, useEffect, useCallback } from 'react'
import DonationForm from '../../../../component/templates/form/DonationForm'
import { useRouter } from 'next/router'
import { axiosFormData, axiosMain } from "../../../../axiosInstances";
import { useAppContext } from "../../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../../context/AppReducer";
import useSWR from "swr";
import ArrowBack from '../../../../component/modules/ArrowBack';

const fetcher = url => axiosMain.get(url).then(res => res.data)

export default function DonasiMarkaz(props) {
    const { detailMarkaz } = props
    const router = useRouter()
    const { markaz_id } = router.query
    const [image, setImage] = useState({});
    const [details, setDetails] = useState({
        amount: 0,
        markaz: null,
    });

    const { data: responseMarkaz } = useSWR(router.isReady ? `/markaz?id=${markaz_id}` : null,
        fetcher,
        { fallbackData: detailMarkaz, refreshInterval: 10000 }
    )

    const checkoutMarkazDonation = useCallback(async (data) => {
        return axiosFormData.post("/transaction", data)
    }, [])


    useEffect(() => {
        if (!!markaz_id) {
            setDetails((prev) => ({
                ...prev,
                markaz: markaz_id
            }))
        }
    }, [markaz_id])

    return (
        <>
            <ArrowBack href={`${enumRoutes.MEMBER_MARKAZ}/${markaz_id}`} />
            <DonationForm
                recipient={responseMarkaz.result.name}
                setImage={setImage}
                image={image}
                details={details}
                setDetails={setDetails}
                router={router}
                apiCall={checkoutMarkazDonation}
                redirectURL={`${enumRoutes.MEMBER_MARKAZ}/${markaz_id}`}
            />
        </>
    )
}

export async function getStaticProps(context) {
    const id = context.params.markaz_id;
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
        params: { markaz_id: markaz.id.toString() },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}

