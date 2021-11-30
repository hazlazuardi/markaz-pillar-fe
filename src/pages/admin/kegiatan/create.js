import { useState } from "react";
import { axiosFormData } from "../../../axiosInstances";
import AdminCreateOrEditKegiatan from "../../../component/templates/admin/AdminCreateOrEditKegiatan";
import ArrowBack from "../../../component/modules/ArrowBack";

function AdminCreateVolunteerKegiatan() {
    const [kegiatan, setKegiatan] = useState({
        name: "",
        description: "",
        term: "",
        benefit: "",
        volunteerNeeded: 0,
        location: "",
        schedule: "",
    });

    const createKegiatan = async (data) => {
        return axiosFormData.post("/admin/volunteer", data)
    };

    return (
        <>
            <ArrowBack href='/admin/kegiatan' />
            <AdminCreateOrEditKegiatan
                variant="create"
                kegiatan={kegiatan}
                setKegiatan={setKegiatan}
                apiCall={createKegiatan}
            />
        </>
    );
}

export default AdminCreateVolunteerKegiatan;
