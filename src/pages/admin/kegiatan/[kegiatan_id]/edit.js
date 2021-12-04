import { useState, useCallback, useEffect } from "react";
import { axiosFormData, axiosMain } from "../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditKegiatan from "../../../../component/templates/admin/AdminCreateOrEditKegiatan";
import useSWR from "swr";
import ArrowBack from "../../../../component/modules/ArrowBack";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminEditVolunteerKegiatan() {
    const router = useRouter();
    const { kegiatan_id } = router.query
    const {
        data: responseKegiatan, error: errorKegiatan
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
        status: responseKegiatan ? responseKegiatan.status : "",
        name: responseKegiatan ? responseKegiatan.name : "",
        description: responseKegiatan ? responseKegiatan.description : "",
        term: responseKegiatan ? responseKegiatan.term : "",
        benefit: responseKegiatan ? responseKegiatan.benefit : "",
        volunteerNeeded: responseKegiatan ? responseKegiatan.volunteerNeeded : 0,
        location: responseKegiatan ? responseKegiatan.location : "",
        schedule: responseKegiatan ? responseKegiatan.schedule : "",
        programOpened: responseKegiatan? responseKegiatan.programOpened: "",
        programClosed: responseKegiatan? responseKegiatan.programClosed: "",
    });

    const editKegiatan = useCallback(async (data) => {
        return axiosFormData.post(`/admin/volunteer/edit?id=${kegiatan_id}`, data)
    }, [kegiatan_id])


    console.log(kegiatan)

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
    if (!responseKegiatan) return "wait.."
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
