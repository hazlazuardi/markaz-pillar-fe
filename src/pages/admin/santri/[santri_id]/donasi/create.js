import { useState, useRef } from "react";
import { useAppContext } from "../../../../../context/AppContext";
import { dispatchTypes } from "../../../../../context/AppReducer";
import { useRouter } from "next/router";
import { axiosMain } from '../../../../../axiosInstances'
import AdminCreateOrEditDonasi from "../../../../../component/templates/admin/AdminCreateOrEditDonasi";
import ArrowBack from "../../../../../component/modules/ArrowBack";

function AdminSantriDonasiCreate(props) {
    const { dispatch } = useAppContext();
    const [data, setData] = useState({
        name: "",
        categories: [],
        description: "",
        nominal: "",
        isActive: null
    });
    const form = useRef(null);

    const handleChangeDonasi = ({ target }) => {
        const { name, value } = target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [success, setSuccess] = useState(false)

    const router = useRouter()
    const { santri_id } = router.query
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();

        await axiosMain
            .post(`/admin/donation/santri?id=${santri_id}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Donasi Santri Created"
                    }
                })
                setSuccess(true)
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

    const [isActive, setIsActive] = useState();

    if (success) {
        router.push("/admin/markaz/"+santri_id+"donasi/")
    }

//      const handleIsActive = (event) => {
//        setIsActive(event.target.isActive);
//      };

    const handleIsActive = (event) => {
        const {
            target: { value },
        } = event;
        setIsActive(event.target.isActive);
        setData((prev) => ({
            ...prev,
            isActive: event.target.value
        }));
    };

    return (
        <>
        <ArrowBack href={`/admin/santri/${santri_id}`} />
        <AdminCreateOrEditDonasi
            form={form}
            handleSubmit={handleSubmit}
            donasi={data}
            createOrEdit="Create"
            markazOrSantri="Santri"
            handleChange={handleChange}
            handleChangeDonasi={handleChangeDonasi}
            handleIsActive={handleIsActive}
            names={names}
            label="Kebutuhan beasiswa"
            showCategory="none"
            displayTotal="none"
        />
        </>
    );
}

export default AdminSantriDonasiCreate;
