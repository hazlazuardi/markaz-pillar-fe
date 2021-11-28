import { useState, useRef, useEffect, useCallback } from "react";
import { useAppContext } from "../../../../context/AppContext";
import { dispatchTypes, enumRoutes } from "../../../../context/AppReducer";
import AdminCreateOrEditMarkaz from "../../../../component/templates/admin/AdminCreateOrEditMarkaz";
import { axiosMain, axiosFormData } from "../../../../axiosInstances";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminMarkazEdit(props) {
    const router = useRouter();
    const { markaz_id } = router.query
    const { data: responseDetailAdminMarkaz, error } = useSWR(router.isReady ? `/markaz?id=${markaz_id}` : null,
        fetcher,
    );

    console.log('swr', responseDetailAdminMarkaz)
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const [editedMarkaz, setEditedMarkaz] = useState({
        name: responseDetailAdminMarkaz ? responseDetailAdminMarkaz.result.name : "",
        background: responseDetailAdminMarkaz ? responseDetailAdminMarkaz.result.background : "",
        category: responseDetailAdminMarkaz ? responseDetailAdminMarkaz.result.category : "",
        address: responseDetailAdminMarkaz ? responseDetailAdminMarkaz.result.address : "",
        contactName: responseDetailAdminMarkaz ? responseDetailAdminMarkaz.result.contactName : "",
        contactInfo: responseDetailAdminMarkaz ? responseDetailAdminMarkaz.result.contactInfo : null
    });
    const form = useRef(null);

    const handleChangeMarkaz = useCallback(({ target }) => {
        const { name, value } = target;
        setEditedMarkaz((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSubmit = useCallback(async (event) => {
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
    }, [dispatch, editedMarkaz, markaz_id, thumbnail])

    // We use useEffect because we store the useSwr Data into
    useEffect(() => {
        if (responseDetailAdminMarkaz) {
            setEditedMarkaz({ ...responseDetailAdminMarkaz.result })
        }
    }, [responseDetailAdminMarkaz])

    const [loading, setLoading] = useState(false)
    if (error) {
        console.log(error)
        return "Error"
    }
    if (!responseDetailAdminMarkaz) return "wait.."
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
                data={responseDetailAdminMarkaz}
            />
        </>
    )
}
