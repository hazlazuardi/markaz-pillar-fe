import { useState, useRef } from "react";
import { useAppContext } from "../../../../../../../context/AppContext";
import {dispatchTypes, enumRoutes} from "../../../../../../../context/AppReducer";
import { axiosFormData } from "../../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditProgres from "../../../../../../../component/templates/admin/AdminCreateOrEditProgres";
import ArrowBack from '../../../../../../../component/modules/ArrowBack'

function AdminCreateSantriProgresDonasi() {
    const router = useRouter();
    const { santri_id, donasi_id } = router.query
    const [progres, setProgres] = useState({
        progressDate: "",
        description: "",
    });

    const createProgresDonasiSantri = async (data) => {
        return axiosFormData.post(`/admin/donation/progress?donation_id=${donasi_id}`, data)
    };

    return (
        <>
            <ArrowBack href={enumRoutes.ADMIN_MARKAZ_DETAIL} />
            <AdminCreateOrEditProgres
                progres={progres}
                setProgres={setProgres}
                createOrEdit="create"
                markazOrSantri="Santri"
                apiCall={createProgresDonasiSantri}
                redirectID={santri_id}
            />
        </>
    );
}

export default AdminCreateSantriProgresDonasi;
