import { useState, useRef } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { dispatchTypes } from "../../../../context/AppReducer";
import {axiosFormData, axiosMain} from "../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditKegiatan from "../../../../component/templates/admin/AdminCreateOrEditKegiatan";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminEditVolunteerKegiatan() {
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const router = useRouter();
    const { id } = router.query
    const {
        data: responseKegiatan,
        error,
        mutate,
    } = useSWR(
        router.isReady ?
            `/volunteer/edit?id=${transid}`: null,
        fetcher,
    );

    const [kegiatan, setKegiatan] = useState({
        name: responseKegiatan ? responseKegiatan.name: "",
        description: responseKegiatan ? responseKegiatan.description: "",
        term: responseKegiatan ? responseKegiatan.term: "",
        benefit: responseKegiatan ? responseKegiatan.benefit: "",
        volunteerNeeded: responseKegiatan ? responseKegiatan.volunteerNeeded: 0,
        location: responseKegiatan ? responseKegiatan.location: "",
        schedule: responseKegiatan ? responseKegiatan.schedule: "",
        isActive: responseKegiatan ? responseKegiatan.isActive: null
    });
    const form = useRef(null);

    const handleChangeKegiatan = ({ target }) => {
        const { name, value } = target;
        setKegiatan((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

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
                        message: "Kegiatan Edited"
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

    const [loading, setLoading] = useState(false)
    return (
        <AdminCreateOrEditKegiatan
            form={form}
            handleSubmit={handleSubmit}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            loading={loading}
            createOrEdit="Edit"
            handleChangeKegiatan={handleChangeKegiatan}
            kegiatan={kegiatan}
        />
    );
}

export default AdminEditVolunteerKegiatan;