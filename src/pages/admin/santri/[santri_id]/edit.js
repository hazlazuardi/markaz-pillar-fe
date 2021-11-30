import { useState, useEffect, useCallback } from "react";
import { enumRoutes } from "../../../../context/AppReducer";
import AdminCreateOrEditSantri from "../../../../component/templates/admin/AdminCreateOrEditSantri";
import { axiosMain, axiosFormData } from "../../../../axiosInstances";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminSantriEdit() {
    const router = useRouter();
    const { santri_id } = router.query
    const { data: responseDetailAdminSantri, error: errorDetailAdminSantri } = useSWR(router.isReady ? `/santri?id=${santri_id}` : null,
        fetcher,
    );
    const { data: responseAllMarkaz, error: errorResponseAllMarkaz } = useSWR(router.isReady ? `/markaz/search?n=1000` : null,
        fetcher,
    );

    const [editedSantri, setEditedSantri] = useState({
        name: responseDetailAdminSantri ? responseDetailAdminSantri.result.name : "",
        background: responseDetailAdminSantri ? responseDetailAdminSantri.result.background : "",
        gender: responseDetailAdminSantri ? responseDetailAdminSantri.result.gender : "",
        markaz_id: responseDetailAdminSantri ? responseDetailAdminSantri.result.markaz.id : "null",
        birthPlace: responseDetailAdminSantri ? responseDetailAdminSantri.result.birthPlace : "",
        birthDate: responseDetailAdminSantri ? responseDetailAdminSantri.result.birthDate : "",
        address: responseDetailAdminSantri ? responseDetailAdminSantri.result.address : "",
    });

    const editSantri = useCallback(async (data) => {
        return axiosFormData.post(`/admin/santri/edit?id=${santri_id}`, data)
    }, [santri_id])

    const [allMarkaz, setAllMarkaz] = useState()

    // We use useEffect because we store the useSwr Data into
    useEffect(() => {
        if (responseDetailAdminSantri) {
            setEditedSantri({
                ...responseDetailAdminSantri.result,
                markaz_id: responseDetailAdminSantri.result.markaz.id
            })
        }
        if (responseAllMarkaz) {
            setAllMarkaz([...responseAllMarkaz.result])
        }
    }, [responseAllMarkaz, responseDetailAdminSantri])

    if (errorDetailAdminSantri || errorResponseAllMarkaz) {
        
        return "Error"
    }
    if (!responseDetailAdminSantri && !responseAllMarkaz) return "wait.."
    return (
        <>
            <ArrowBack href={`${enumRoutes.ADMIN_SANTRI}/${santri_id}`} />
            <AdminCreateOrEditSantri
                variant='edit'
                santri={editedSantri}
                setSantri={setEditedSantri}
                dataSantri={responseDetailAdminSantri}
                allMarkaz={allMarkaz}
                apiCall={editSantri}
            />
        </>
    )
}
