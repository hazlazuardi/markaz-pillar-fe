import { useState, useRef } from "react";
import { useAppContext } from "../../../../../../context/AppContext";
import { dispatchTypes } from "../../../../../../context/AppReducer";
import { axiosFormData, axiosMain } from "../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditTestimoni from "../../../../../../component/templates/admin/AdminCreateOrEditTestimoni";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminEditVolunteerTestimoni() {
    const router = useRouter();
    const { testimoni_id, kegiatan_id } = router.query
    const {
        data: responseTestimoni,
        error,
        mutate,
    } = useSWR(
        router.isReady ?
            `/admin/volunteer/testimony?id=${testimoni_id}` : null,
        fetcher,
    );

    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const [testi, setEditTesti] = useState({
        name: responseTestimoni ? responseTestimoni.name : "",
        description: responseTestimoni ? responseTestimoni.description : "",
    });
    const form = useRef(null);

    const handleChangeTestimoni = ({ target }) => {
        const { name, value } = target;
        setEditTesti((prev) => ({
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
            .post(`/admin/volunteer/testimony/edit?id=${testimoni_id}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Testimoni Edited"
                    }
                })
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

    const pathname = router.pathname;
    const [loading, setLoading] = useState(false)
    return (
        <AdminCreateOrEditTestimoni
            form={form}
            handleSubmit={handleSubmit}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            loading={loading}
            createOrEdit="Edit"
            handleChangeTestimoni={handleChangeTestimoni}
            testi={testi}
        />
    );
}

export default AdminEditVolunteerTestimoni;
