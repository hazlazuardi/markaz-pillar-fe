import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosFormData, axiosMain } from "../../../../../../axiosInstances";
import AdminCreateOrEditDonasi from "../../../../../../component/templates/admin/AdminCreateOrEditDonasi";
import ArrowBack from "../../../../../../component/modules/ArrowBack";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminMarkazDonasiEdit() {
    const router = useRouter();
    const { markaz_id, donasi_id } = router.query
    const {
        data: responseDonasi, error: errorDonasi
    } = useSWR(
        router.isReady ?
            `/admin/donation?id=${donasi_id}` : null,
        fetcher,
    );

    const [data, setData] = useState({
        name: responseDonasi ? responseDonasi.name : "",
        categories: responseDonasi ? responseDonasi.categories : [],
        description: responseDonasi ? responseDonasi.description : "",
        nominal: responseDonasi ? responseDonasi.nominal : "",
        isActive: responseDonasi ? responseDonasi.isActive : null,
    });

    const editDonasiMarkaz = async (data) => {
        return axiosMain.post(`/admin/donation/markaz/edit?id=${donasi_id}`, data)
    };

    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (responseDonasi && !loaded) {
            setData({
                ...responseDonasi.result,
            })
            setLoaded(true)
        }
    }, [loaded, responseDonasi])

    if (errorDonasi) return "Error"
    if (!responseDonasi) return "wait.."

    return (
        <>
            <ArrowBack href={`/admin/markaz/${markaz_id}/donasi`} />
            <AdminCreateOrEditDonasi
                donasi={data}
                createOrEdit="edit"
                markazOrSantri="markaz"
                label="Kebutuhan fasilitas"
                setData={setData}
                apiCall={editDonasiMarkaz}
                redirectID={markaz_id}
            />
        </>
    );
}

export default AdminMarkazDonasiEdit;
