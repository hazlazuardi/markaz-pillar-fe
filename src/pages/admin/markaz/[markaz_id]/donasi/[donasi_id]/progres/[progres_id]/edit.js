import {useState, useCallback, useEffect} from "react";
import  {enumRoutes} from "../../../../../../../../context/AppReducer";
import { axiosFormData, axiosMain } from "../../../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditProgres from '../../../../../../../../component/templates/admin/AdminCreateOrEditProgres'
import useSWR from "swr";
import ArrowBack from "../../../../../../../../component/modules/ArrowBack";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminEditMarkazProgresDonasi() {
    const router = useRouter();
    const { donasi_id, markaz_id, progres_id } = router.query
    const {
        data: responseProgres, error: errorProgres
    } = useSWR(
        router.isReady ?
            `/admin/donation/progress?id=${progres_id}` : null,
        fetcher,
    );
    const [progres, setProgres] = useState({
        progressDate: responseProgres ? responseProgres.progressDate : "",
        description: responseProgres ? responseProgres.description : "",
    });

    const editProgresDonasiMarkaz = useCallback(async (data) => {
        return axiosFormData.post(`/admin/donation/progress/edit?id=${progres_id}`, data)
    }, [progres_id])

    console.log(progres)

    useEffect(() => {
        if (responseProgres) {
            setProgres({
                ...responseProgres.result,
            })
        }
    }, [responseProgres])

    if (errorProgres) return "Error"
    if (!responseProgres) return "wait.."

    return (
        <>
        <ArrowBack href={`${enumRoutes.ADMIN_MARKAZ}/${markaz_id}/`} />
            <AdminCreateOrEditProgres
                progres={progres}
                setProgres={setProgres}
                createOrEdit="edit"
                markazOrSantri="markaz"
                apiCall={editProgresDonasiMarkaz}
                redirectID={markaz_id}
            />
        </>
    );
}

export default AdminEditMarkazProgresDonasi;
