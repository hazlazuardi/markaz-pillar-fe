import { useState, useRef } from "react";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes } from "../../../context/AppReducer";
import { axiosFormData, axiosMain } from "../../../axiosInstances";
import AdminCreateOrEditSantri from "../../../component/templates/admin/AdminCreateOrEditSantri";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)
function AdminSantriCreate() {
    const { data: responseMarkaz, error } = useSWR(`/markaz/search?n=1000`, fetcher)
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
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
    const form = useRef(null);

    const handleChangeSantri = ({ target }) => {
        const { name, value } = target;
        setSantri((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const santriBlob = new Blob([JSON.stringify(santri)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("santri", santriBlob);


        await axiosFormData
            .post(`/admin/santri?markaz_id=${santri.markaz_id}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Santri Created"
                    }
                })
            })
            .catch(e => {
                setLoading(false)
                // Check & Handle if e.response is defined
                if (!!e.response) {
                    // Check & Handle if bad request (empty fields, etc)
                    dispatch({
                        type: dispatchTypes.SNACKBAR_CUSTOM,
                        payload: {
                            severity: 'error',
                            message: 'Incorrect information'
                        }
                    });
                }
            })
    };

    console.log('markaz', !!responseMarkaz && responseMarkaz.result)
    const [loading, setLoading] = useState(false)
    return (
        <AdminCreateOrEditSantri
            handleSubmit={handleSubmit}
            form={form}
            loading={loading}
            santri={santri}
            allMarkaz={!!responseMarkaz && responseMarkaz.result}
            error={error}
            setThumbnail={setThumbnail}
            handleChangeSantri={handleChangeSantri}
            thumbnail={thumbnail}

        />
    );
}

export default AdminSantriCreate;
