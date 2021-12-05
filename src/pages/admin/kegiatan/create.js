import {useCallback, useEffect, useState} from "react";
import {axiosFormData, axiosMain} from "../../../axiosInstances";
import AdminCreateOrEditKegiatan from "../../../component/templates/admin/AdminCreateOrEditKegiatan";
import ArrowBack from "../../../component/modules/ArrowBack";
import useSWR from "swr";
import {useRouter} from "next/router";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

function AdminCreateVolunteerKegiatan() {
    const router = useRouter();
    const [kegiatan, setKegiatan] = useState({
        status: "",
        name: "",
        description: "",
        volunteerNeeded: 0,
        location: "",
        schedule: "",
        programCompleted: "",
        markazId: ""
    });

    const { data: responseAllMarkaz, error: errorResponseAllMarkaz }
        = useSWR(router.isReady ? `/markaz/search?n=1000` : null,
        fetcher,
    );

    const createKegiatan = async (data) => {
        return axiosFormData.post("/admin/volunteer?markaz_id="+kegiatan.markazId, data)
    };

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

    console.log(kegiatan)

    return (
        <>
            <ArrowBack href='/admin/kegiatan' />
            <AdminCreateOrEditKegiatan
                variant="create"
                kegiatan={kegiatan}
                setKegiatan={setKegiatan}
                apiCall={createKegiatan}
                allMarkaz={allMarkaz}
            />
        </>
    );
}

export default AdminCreateVolunteerKegiatan;
