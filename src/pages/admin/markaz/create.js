import { useState, useCallback } from "react";
import { enumRoutes } from "../../../context/AppReducer";
import AdminCreateOrEditMarkaz from "../../../component/templates/admin/AdminCreateOrEditMarkaz";
import { axiosFormData } from "../../../axiosInstances";
import ArrowBack from "../../../component/modules/ArrowBack";

function AdminMarkazCreate() {
    const [markaz, setMarkaz] = useState({
        name: "",
        background: "",
        category: "",
        address: "",
    });

    const createMarkaz = useCallback(async (data) => {
        return axiosFormData.post("/admin/markaz", data)
    }, [])

    return (
        <>
            <ArrowBack href={enumRoutes.ADMIN_MARKAZ} />
            <AdminCreateOrEditMarkaz
                variant='create'
                markaz={markaz}
                setMarkaz={setMarkaz}
                apiCall={createMarkaz}
            />
        </>
    );
}

export default AdminMarkazCreate;
