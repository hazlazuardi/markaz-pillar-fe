import { useState, useEffect, useCallback } from "react";
import { enumRoutes } from "../../../context/AppReducer";
import AdminCreateOrEditSantri from "../../../component/templates/admin/AdminCreateOrEditSantri";
import { axiosMain, axiosFormData } from "../../../axiosInstances";
import ArrowBack from "../../../component/modules/ArrowBack";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminSantriCreate() {
    const router = useRouter();
    const { data: responseAllMarkaz, error: errorResponseAllMarkaz } = useSWR(router.isReady ? `/markaz/search?n=1000` : null,
        fetcher,
    );

    const [editedSantri, setEditedSantri] = useState({
        name: "",
        background: "",
        gender: "",
        markaz_id: "",
        birthPlace: "",
        birthDate: "",
        address: "",
        category: "",

    });

    const createSantri = useCallback(async (data, id) => {
        return axiosFormData.post(`/admin/santri?markaz_id=${id}`, data)
    }, [])

    const [allMarkaz, setAllMarkaz] = useState()

    // We use useEffect because we store the useSwr Data into
    useEffect(() => {
        if (responseAllMarkaz) {
            setAllMarkaz([...responseAllMarkaz.result])
        }
    }, [responseAllMarkaz])

    if (errorResponseAllMarkaz) {
        
        return "Error"
    }
    if (!responseAllMarkaz) return "wait.."
    return (
        <>
            <ArrowBack href={enumRoutes.ADMIN_SANTRI} />
            <AdminCreateOrEditSantri
                variant='create'
                santri={editedSantri}
                setSantri={setEditedSantri}
                allMarkaz={allMarkaz}
                dataMarkaz={responseAllMarkaz}
                apiCall={createSantri}
            />
        </>
    )
}
