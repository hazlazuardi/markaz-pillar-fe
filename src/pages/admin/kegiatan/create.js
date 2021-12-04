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
        status: "MEMBUKA_PENDAFTARAN",
        name: "",
        programOpened: "",
        programClosed: "",
        programCompleted: null,
        description: "",
        term: "",
        benefit: "",
        volunteerNeeded: 0,
        volunteerApplied: null,
        location: "",
        schedule: "",
        testimonies: [],
        markazId: "",
    });

    const { data: responseAllMarkaz, error: errorResponseAllMarkaz }
        = useSWR(router.isReady ? `/markaz/search?n=1000` : null,
        fetcher,
    );

    const createKegiatan = useCallback( async (data) => {
        return axiosFormData.post("/admin/volunteer", data)
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
