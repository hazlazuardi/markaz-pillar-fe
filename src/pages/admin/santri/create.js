import { useState } from "react";
import { axiosFormData, axiosMain } from "../../../axiosInstances";
import AdminCreateOrEditSantri from "../../../component/templates/admin/AdminCreateOrEditSantri";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)
function AdminSantriCreate() {
    const { data: responseMarkaz, error } = useSWR(`/markaz/search?n=1000`, fetcher)
    const [santri, setSantri] = useState({
        name: "",
        background: "",
        gender: "",
        markaz_id: "",
        address: "",
        category: "",
        birthDate: "",
        birtPlace: ""
    });


    const createSantri = async (markazId, data) => {
        return axiosFormData.post(`/admin/santri?markaz_id=${markazId}`, data)
    }

    
    return (
        <AdminCreateOrEditSantri
            isCreate
            apiCall={createSantri}
            santri={santri}
            setSantri={setSantri}
            allMarkaz={!!responseMarkaz && responseMarkaz.result}
            error={error}
        />
    );
}

export default AdminSantriCreate;
