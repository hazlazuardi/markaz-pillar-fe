import { useState, useRef } from "react";
import { useAppContext } from "../../../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../../../context/AppReducer";
import { axiosFormData } from "../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditTestimoni from "../../../../../component/templates/admin/AdminCreateOrEditTestimoni";
import ArrowBack from "../../../../../component/modules/ArrowBack";

function AdminCreateVolunteerTestimoni() {
    const router = useRouter();
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const { kegiatan_id } = router.query
    const [testi, setTesti] = useState({
        name: "",
        description: "",
    });
    const form = useRef(null);

    const handleChangeTestimoni = ({ target }) => {
        const { name, value } = target;
        setTesti((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const testiBlob = new Blob([JSON.stringify(testi)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("detail", testiBlob);


        await axiosFormData
            .post(`/admin/volunteer/testimony?program_id=${kegiatan_id}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Testimoni Created"
                    }
                })
                router.push(`${enumRoutes.ADMIN_KEGIATAN}/${kegiatan_id}`)
            })
            .catch(error => {
                setLoading(false)

                // Check & Handle if error.response is undefined
                if (!!error.response) {
                    if (error.response.status === 400) {

                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Incorrect information'
                            }
                        });
                    } else if (error.response.status === 413) {

                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'The image size is too large'
                            }
                        });
                    } else {

                        dispatch({
                            type: dispatchTypes.SERVER_ERROR
                        });
                    }
                } else {
                    dispatch({
                        type: dispatchTypes.SERVER_ERROR
                    });
                }
            })
    };

    const [loading, setLoading] = useState(false)
    return (
        <>
            <ArrowBack href={`/admin/kegiatan/${kegiatan_id}`} />
            <AdminCreateOrEditTestimoni
                form={form}
                handleSubmit={handleSubmit}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
                loading={loading}
                createOrEdit="Create"
                handleChangeTestimoni={handleChangeTestimoni}
                testi={testi}
            />
        </>
    );
}

export default AdminCreateVolunteerTestimoni;
