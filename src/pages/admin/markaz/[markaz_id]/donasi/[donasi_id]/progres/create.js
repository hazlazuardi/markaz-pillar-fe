import { useState } from "react";
import { enumRoutes } from "../../../../../../../context/AppReducer";
import { axiosFormData } from "../../../../../../../axiosInstances";
import AdminCreateOrEditProgres from "../../../../../../../component/templates/admin/AdminCreateOrEditProgres";
import ArrowBack from "../../../../../../../component/modules/ArrowBack";
import {useRouter} from "next/router";

function AdminCreateMarkazProgresDonasi() {
    const router = useRouter();
    const { markaz_id, donasi_id } = router.query
    const [progres, setProgres] = useState({
        progressDate: "",
        description: "",
    });

    const createProgresDonasiMarkaz = async (data) => {
        return axiosFormData.post(`/admin/donation/progress?donation_id=${donasi_id}`, data)
    };

    return (
        <>
            <ArrowBack href={`${enumRoutes.ADMIN_MARKAZ}/${markaz_id}/donasi`} />
            <AdminCreateOrEditProgres
                progres={progres}
                setProgres={setProgres}
                createOrEdit="create"
                markazOrSantri="Markaz"
                apiCall={createProgresDonasiMarkaz}
                redirectID={markaz_id}
            />
        </>
    );
}

export default AdminCreateMarkazProgresDonasi;
