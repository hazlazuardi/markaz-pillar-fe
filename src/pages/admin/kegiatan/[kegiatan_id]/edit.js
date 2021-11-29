import { useState, useCallback } from "react";
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
        data: responseKegiatan,
    } = useSWR(
        router.isReady ?
            `/volunteer/edit?id=${kegiatan_id}` : null,
        fetcher,
    );

    const [kegiatan, setKegiatan] = useState({
        name: responseKegiatan ? responseKegiatan.name : "",
        description: responseKegiatan ? responseKegiatan.description : "",
        term: responseKegiatan ? responseKegiatan.term : "",
        benefit: responseKegiatan ? responseKegiatan.benefit : "",
        volunteerNeeded: responseKegiatan ? responseKegiatan.volunteerNeeded : 0,
        location: responseKegiatan ? responseKegiatan.location : "",
        schedule: responseKegiatan ? responseKegiatan.schedule : "",
        isActive: responseKegiatan ? responseKegiatan.isActive : null
    });

    const editKegiatan = useCallback(async (data) => {
        return axiosFormData.post(`/admin/volunteer/edit?id=${kegiatan_id}`, data)
    }, [kegiatan_id])

    return (
        <>
            <ArrowBack href={`/admin/kegiatan/${kegiatan_id}`} />
            <AdminCreateOrEditKegiatan
                variant="edit"
                kegiatan={kegiatan}
                setKegiatan={setKegiatan}
                kegiatan_id={kegiatan_id}
                apiCall={editKegiatan}
            />
        </>
    );
}

export default AdminEditVolunteerKegiatan;
