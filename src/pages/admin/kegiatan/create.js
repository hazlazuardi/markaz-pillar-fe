import { useState, useRef } from "react";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes } from "../../../context/AppReducer";
import { axiosFormData } from "../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditKegiatan from "../../../component/templates/admin/AdminCreateOrEditKegiatan";
import ArrowBack from "../../../component/modules/ArrowBack";

function AdminCreateVolunteerKegiatan() {
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const [kegiatan, setKegiatan] = useState({
        name: "",
        description: "",
        term: "",
        benefit: "",
        volunteerNeeded: 0,
        location: "",
        schedule: "",
    });
    const form = useRef(null);

    const handleChangeKegiatan = ({ target }) => {
        const { name, value } = target;
        setKegiatan((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const kegiatanBlob = new Blob([JSON.stringify(kegiatan)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("detail", kegiatanBlob);

        console.log(kegiatan);

        await axiosFormData
            .post("/admin/volunteer", data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Kegiatan Created"
                    }
                })
                setSubmitted(true);
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
            <ArrowBack href='/admin/kegiatan' />
            <AdminCreateOrEditKegiatan
                form={form}
                handleSubmit={handleSubmit}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
                loading={loading}
                createOrEdit="Create"
                handleChangeKegiatan={handleChangeKegiatan}
                kegiatan={kegiatan}
            />
        </>
    );
}

export default AdminCreateVolunteerKegiatan;
