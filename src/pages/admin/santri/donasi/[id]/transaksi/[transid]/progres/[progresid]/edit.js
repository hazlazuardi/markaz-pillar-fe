import { useState, useRef } from "react";
import { useAppContext } from "../../../../../../../../../context/AppContext";
import { dispatchTypes } from "../../../../../../../../../context/AppReducer";
import {axiosFormData, axiosMain} from "../../../../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditProgres from "../../../../../../../../../component/templates/admin/AdminCreateOrEditProgres";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminEditSantriProgressDonasi(props) {
    const router = useRouter();
    const { transid, progresid } = router.query
    const {
        data: responseProgres,
        error,
        mutate,
    } = useSWR(
        router.isReady ?
            `/admin/donation?id=${transid}`: null,
        fetcher,
    );

    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const [editedProgres, setEditedProgres] = useState({
        progressDate: responseProgres ? responseProgres.progressDate: "",
        description: responseProgres ? responseProgres.description: "",
    });
    const form = useRef(null);

    const handleChangeProgres = ({ target }) => {
        const { name, value } = target;
        setEditedProgres((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const progresBlob = new Blob([JSON.stringify(editedProgres)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("detail", progresBlob);

        await axiosFormData
            .post(`/admin/donation/progress/edit?id=${progresid}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Progres Edited"
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
        <AdminCreateOrEditProgres
            form={form}
            handleSubmit={handleSubmit}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            loading={loading}
            createOrEdit="Edit"
            markazOrSantri="Santri"
            handleChangeProgres={handleChangeProgres}
            progres={editedProgres}
            />
    );
}

export default AdminEditSantriProgressDonasi;
