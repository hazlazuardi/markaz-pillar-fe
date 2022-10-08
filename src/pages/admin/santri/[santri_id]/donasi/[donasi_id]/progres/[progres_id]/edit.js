import {useState, useRef, useCallback, useEffect} from "react";
import { useAppContext } from "../../../../../../../../context/AppContext";
import {dispatchTypes, enumRoutes} from "../../../../../../../../context/AppReducer";
import { axiosFormData, axiosMain } from "../../../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditProgres from "../../../../../../../../component/templates/admin/AdminCreateOrEditProgres";
import useSWR from "swr";
import ArrowBack from "../../../../../../../../component/modules/ArrowBack";

const fetcher = (url) => fetch(url).then((res) => res.json())

function AdminEditSantriProgresDonasi() {
    const router = useRouter();
    const { santri_id, progres_id } = router.query
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

    const editProgresDonasiSantri = useCallback(async (data) => {
        return axiosFormData.post(`/admin/donation/progress/edit?id=${progres_id}`, data)
    }, [progres_id])

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
            <ArrowBack href={`${enumRoutes.ADMIN_SANTRI}/${santri_id}`} />
            <AdminCreateOrEditProgres
                progres={progres}
                setProgres={setProgres}
                createOrEdit="edit"
                markazOrSantri="santri"
                apiCall={editProgresDonasiSantri}
                redirectID={santri_id}
            />
        </>
    );
}

export default AdminEditSantriProgresDonasi;
