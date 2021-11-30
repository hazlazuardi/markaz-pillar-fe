import {useCallback, useState} from "react";
import AdminCreateOrEditDonasi from "../../../../../component/templates/admin/AdminCreateOrEditDonasi";
import ArrowBack from "../../../../../component/modules/ArrowBack";
import {useRouter} from "next/router";
import {axiosFormData} from "../../../../../axiosInstances";

function AdminSantriDonasiCreate() {
    const router = useRouter();
    const { santri_id } = router.query
    const [data, setData] = useState({
        name: "",
        categories: [],
        description: "",
        nominal: "",
        isActive: null
    });

    const createDonasiSantri = async (data) => {
        return axiosFormData.post(`/admin/donation/santri?id=${santri_id}`, data)
    };

    return (
        <>
            <ArrowBack href={`/admin/santri/${santri_id}`} />
            <AdminCreateOrEditDonasi
                donasi={data}
                createOrEdit="create"
                markazOrSantri="Santri"
                label="Kebutuhan beasiswa"
                setData={setData}
                apiCall={createDonasiSantri}
                displayTotal="none"
            />
        </>
    );
}

export default AdminSantriDonasiCreate;
