import {useState, useCallback, useEffect} from "react";
import { axiosFormData, axiosMain } from "../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditTestimoni from "../../../../../../component/templates/admin/AdminCreateOrEditTestimoni";
import useSWR from "swr";
import ArrowBack from "../../../../../../component/modules/ArrowBack";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminEditVolunteerTestimoni() {
    const router = useRouter();
    const { testimoni_id, kegiatan_id } = router.query
    const {
        data: responseTestimoni, error: errorTestimoni
    } = useSWR(
        router.isReady ?
            `/admin/volunteer/testimony?id=${testimoni_id}` : null,
        fetcher,
    );

    const [testi, setTesti] = useState({
        name: responseTestimoni ? responseTestimoni.name : "",
        description: responseTestimoni ? responseTestimoni.description : "",
    });

    const editTesti = useCallback(async (data) => {
        return axiosFormData.post(`/admin/volunteer/testimony/edit?id=${testimoni_id}`, data)
    }, [testimoni_id])

    useEffect(() => {
        if (responseTestimoni) {
            setTesti({
                ...responseTestimoni.result,
            })
        }
    }, [responseTestimoni])

    if (errorTestimoni) return "Error"
    if (!responseTestimoni) return "wait.."
    return (
        <>
            <ArrowBack href={`/admin/kegiatan/${kegiatan_id}`} />
            <AdminCreateOrEditTestimoni
                testi={testi}
                createOrEdit="edit"
                setTesti={setTesti}
                apiCall={editTesti}
                redirectID={kegiatan_id}
            />
        </>
    );
}

export default AdminEditVolunteerTestimoni;
