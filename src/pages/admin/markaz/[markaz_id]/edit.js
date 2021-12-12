import { useState, useEffect, useCallback } from "react";
import { enumRoutes } from "../../../../context/AppReducer";
import AdminCreateOrEditMarkaz from "../../../../component/templates/admin/AdminCreateOrEditMarkaz";
import { axiosMain, axiosFormData } from "../../../../axiosInstances";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminMarkazEdit() {
    const router = useRouter();
    const { markaz_id } = router.query
    const { data: responseDetailAdminMarkaz, error: errorResponse } = useSWR(router.isReady ? `/markaz?id=${markaz_id}` : null,
        fetcher,
    );

    const [editedMarkaz, setEditedMarkaz] = useState({
        name: "",
        background: "",
        category: "",
        address: "",
        contactName: "",
        contactInfo: null
    });

    const editMarkaz = useCallback(async (data) => {
        return axiosFormData.post(`/admin/markaz/edit?id=${markaz_id}`, data)
    }, [markaz_id])

    // We use useEffect because we store the useSwr Data into
    useEffect(() => {
        if (responseDetailAdminMarkaz) {
            setEditedMarkaz({ ...responseDetailAdminMarkaz.result })
        }
    }, [responseDetailAdminMarkaz])

    if (errorResponse) {

        return "Error"
    }
    if (!responseDetailAdminMarkaz) return "wait.."
    return (
        <>
            <ArrowBack href={`${enumRoutes.ADMIN_MARKAZ}/${markaz_id}`} />
            <AdminCreateOrEditMarkaz
                variant='edit'
                markaz={editedMarkaz}
                setMarkaz={setEditedMarkaz}
                data={responseDetailAdminMarkaz}
                apiCall={editMarkaz}
                redirectID={markaz_id}
            />
        </>
    )
}
