import { useState } from "react";
import { axiosFormData } from "../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditTestimoni from "../../../../../component/templates/admin/AdminCreateOrEditTestimoni";
import ArrowBack from "../../../../../component/modules/ArrowBack";

function AdminCreateVolunteerTestimoni() {
    const router = useRouter();
    const { kegiatan_id } = router.query
    const [testi, setTesti] = useState({
        name: "",
        description: "",
    });

    const createTesti = async (data) => {
        return axiosFormData.post(`/admin/volunteer/testimony?program_id=${kegiatan_id}`, data)
    };

    return (
        <>
            <ArrowBack href={`/admin/kegiatan/${kegiatan_id}`} />
            <AdminCreateOrEditTestimoni
                testi={testi}
                createOrEdit="create"
                setTesti={setTesti}
                apiCall={createTesti}
                redirectID={kegiatan_id}
            />
        </>
    );
}

export default AdminCreateVolunteerTestimoni;
