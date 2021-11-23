import { useState, useRef } from "react";
import { useAppContext } from "../../../../../../../../context/AppContext";
import { dispatchTypes } from "../../../../../../../../context/AppReducer";
import { axiosFormData } from "../../../../../../../../axiosInstances";
import { useRouter } from 'next/router';
import AdminCreateOrEditProgres from "../../../../../../../../component/templates/admin/AdminCreateOrEditProgres";

function AdminCreateSantriProgressDonasi() {
    const router = useRouter();
    const { dispatch } = useAppContext();
    const { transid } = router.query
    const [thumbnail, setThumbnail] = useState({});
    const [progres, setProgres] = useState({
        progressDate: "",
        description: "",
    });
    const form = useRef(null);

    const handleChangeProgres = ({ target }) => {
        const { name, value } = target;
        setProgres((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const progresBlob = new Blob([JSON.stringify(progres)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("detail", progresBlob);

        await axiosFormData
            .post(`/admin/donation/progress?donation_id=${transid}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Progres Created"
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
            createOrEdit="Create"
            markazOrSantri="Santri"
            handleChangeProgres={handleChangeProgres}
            progres={progres}
        />
    );
}

export default AdminCreateSantriProgressDonasi;
