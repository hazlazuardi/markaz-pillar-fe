import { useState, useRef } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../../context/AppReducer";
import AdminCreateOrEditMarkaz from "../../../../component/templates/admin/AdminCreateOrEditMarkaz";
import { axiosFormData } from "../../../../axiosInstances";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export default function AdminMarkazEdit(props) {
    const { responseMarkaz } = props
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const [editedMarkaz, setEditedMarkaz] = useState({
        name: responseMarkaz ? responseMarkaz.name : null,
        background: responseMarkaz ? responseMarkaz.background : null,
        category: responseMarkaz ? responseMarkaz.category : null,
        address: responseMarkaz ? responseMarkaz.address : null,
        contactName: responseMarkaz ? responseMarkaz.contactName : null,
        contactInfo: responseMarkaz ? responseMarkaz.contactInfo : null
    });
    const form = useRef(null);

    const handleChangeMarkaz = ({ target }) => {
        const { name, value } = target;
        setEditedMarkaz((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const router = useRouter()
    const { markaz_id } = router.query
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const editedMarkazBlob = new Blob([JSON.stringify(editedMarkaz)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("markaz", editedMarkazBlob);

        await axiosFormData
            .post(`/admin/markaz/edit?id=${markaz_id}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Markaz Edited"
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
                                message: 'Incorrect edited information'
                            }
                        });
                    } else if (error.response.status === 413) {

                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'File is larger than 1 MB'
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
            <ArrowBack href={enumRoutes.ADMIN_MARKAZ_DETAIL} />
            <AdminCreateOrEditMarkaz
                form={form}
                loading={loading}
                handleSubmit={handleSubmit}
                handleChangeMarkaz={handleChangeMarkaz}
                setThumbnail={setThumbnail}
                thumbnail={thumbnail}
                markaz={editedMarkaz}
            />
        </>
    )
}
