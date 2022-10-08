import { useState, useCallback, useEffect } from "react";
import { axiosFormData, axiosMain } from "../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditKegiatan from "../../../../component/templates/admin/AdminCreateOrEditKegiatan";
import useSWR from "swr";
import ArrowBack from "../../../../component/modules/ArrowBack";

const fetcher = (url) => fetch(url).then((res) => res.json())

function AdminEditVolunteerKegiatan() {
    const router = useRouter();
    const { kegiatan_id } = router.query
    const {
        data: responseKegiatan, error: errorKegiatan, mutate
    } = useSWR(
        router.isReady ?
            `/volunteer?id=${kegiatan_id}` : null,
        fetcher,
    );

    const { data: responseAllMarkaz, error: errorResponseAllMarkaz }
        = useSWR(router.isReady ? `/markaz/search?n=1000` : null,
        fetcher,
    );

    const [kegiatan, setKegiatan] = useState({
        markazId: ""
    });

    const editKegiatan = useCallback(async (data) => {
        return axiosFormData.post(`/admin/volunteer/edit?id=${kegiatan_id}`, data)
    }, [kegiatan_id])

    const [allMarkaz, setAllMarkaz] = useState()

    // We use useEffect because we store the useSwr Data into
    useEffect(() => {
        if (responseKegiatan) {
            setKegiatan({
                ...responseKegiatan.result,
                markazId: responseKegiatan.result.markaz.id
            })
        }
        if (responseAllMarkaz) {
            setAllMarkaz([...responseAllMarkaz.result])
        }
    }, [responseAllMarkaz, responseKegiatan])

    if (errorKegiatan || errorResponseAllMarkaz) {
        return "Error"
    }
    if (!responseKegiatan && !kegiatan.status) return "wait.."
    if (!responseAllMarkaz) return "wait.."
    return (
        <>
            <ArrowBack href={`/admin/kegiatan/${kegiatan_id}`} />
            <AdminCreateOrEditKegiatan
                variant="edit"
                kegiatan={kegiatan}
                setKegiatan={setKegiatan}
                kegiatan_id={kegiatan_id}
                apiCall={editKegiatan}
                allMarkaz={allMarkaz}
                originalKegiatan={responseKegiatan}
            />
        </>
    );
}

export default AdminEditVolunteerKegiatan;
