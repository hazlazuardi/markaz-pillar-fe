import {useState, useCallback, useEffect} from "react";
import { useRouter } from "next/router";
import {axiosFormData, axiosMain} from "../../../../../../axiosInstances";
import AdminCreateOrEditDonasi from "../../../../../../component/templates/admin/AdminCreateOrEditDonasi";
import ArrowBack from "../../../../../../component/modules/ArrowBack";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminSantriDonasiEdit() {
    const router = useRouter();
    const { santri_id, donasi_id } = router.query
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

    const editDonasiSantri = async (data) => {
        return axiosMain.post(`/admin/donation/santri/edit?id=${donasi_id}`, data)
    };

    useEffect(() => {
        if (responseDonasi) {
            setData({
                ...responseDonasi.result,
            })
        }
    }, [responseDonasi])

    if (errorDonasi) return "Error"
    if (!responseDonasi) return "wait.."

    return (
        <>
            <ArrowBack href={`/admin/santri/${santri_id}/donasi`} />
            <AdminCreateOrEditDonasi
                donasi={data}
                createOrEdit="Edit"
                markazOrSantri="santri"
                label="Kebutuhan beasiswa"
                setData={setData}
                apiCall={editDonasiSantri}
                redirectID={santri_id}
            />
        </>
    );
}



export default AdminSantriDonasiEdit;
