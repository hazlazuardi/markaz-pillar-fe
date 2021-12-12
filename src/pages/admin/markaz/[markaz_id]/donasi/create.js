import { useState } from "react";
import { axiosMain } from "../../../../../axiosInstances";
import AdminCreateOrEditDonasi from "../../../../../component/templates/admin/AdminCreateOrEditDonasi";
import ArrowBack from "../../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";

function AdminMarkazDonasiCreate() {
    const router = useRouter();
    const { markaz_id } = router.query
    const [data, setData] = useState({
        name: "",
        categories: [],
        description: "",
        nominal: 0,
        isActive: null
    });

    const createDonasiMarkaz = async (data) => {
        return axiosMain.post(`/admin/donation/markaz?id=${markaz_id}`, data)
    };

    return (
        <>
            <ArrowBack href={`/admin/markaz/${markaz_id}/`} />
            <AdminCreateOrEditDonasi
                donasi={data}
                createOrEdit="create"
                markazOrSantri="markaz"
                label="Kebutuhan fasilitas"
                setData={setData}
                apiCall={createDonasiMarkaz}
                displayTotal="none"
                redirectID={markaz_id}
            />
        </>
    );
}

export default AdminMarkazDonasiCreate;
