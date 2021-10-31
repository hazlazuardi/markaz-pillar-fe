import { useState, useRef } from "react";
import { useAppContext } from "../../../context/AppContext";
import { dispatchTypes } from "../../../context/AppReducer";
import AdminCreateOrEditMarkaz from "../../../component/templates/admin/AdminCreateOrEditMarkaz";
import { axiosFormData } from "../../../axiosInstances";

function AdminMarkazCreate() {
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const [markaz, setMarkaz] = useState({
        name: "",
        background: "",
        category: "",
        address: "",
    });
    const form = useRef(null);

    const handleChangeMarkaz = ({ target }) => {
        const { name, value } = target;
        setMarkaz((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const markazBlob = new Blob([JSON.stringify(markaz)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("markaz", markazBlob);


        await axiosFormData
            .post("/admin/markaz", data)
            .then(response => {
                setLoading(false)
                
                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Markaz Created"
                    }
                })
            })
            .catch(error => {
                setLoading(false)
                
                // Check & Handle if error.response is defined
                if (!!error.response) {
                    if (error.response.status === 400) {
                        // Check & Handle if bad request (empty fields, etc)
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'Incorrect information'
                            }
                        });
                    } else if (error.response.status === 413) {
                        // Check & Handle if image file is too large (> 1MB)
                        dispatch({
                            type: dispatchTypes.SNACKBAR_CUSTOM,
                            payload: {
                                severity: 'error',
                                message: 'The image size is too large'
                            }
                        });
                    } else {
                        // Check & Handle if other error code
                        dispatch({
                            type: dispatchTypes.SERVER_ERROR
                        });
                    }
                } else {
                    // Check & Handle if error.response is undefined
                    dispatch({
                        type: dispatchTypes.SERVER_ERROR
                    });
                }
            })
    };

    const [loading, setLoading] = useState(false)
    return (
        <AdminCreateOrEditMarkaz
            form={form}
            loading={loading}
            handleSubmit={handleSubmit}
            handleChangeMarkaz={handleChangeMarkaz}
            setThumbnail={setThumbnail}
            thumbnail={thumbnail}
            markaz={markaz}

        />
    );
}

export default AdminMarkazCreate;
