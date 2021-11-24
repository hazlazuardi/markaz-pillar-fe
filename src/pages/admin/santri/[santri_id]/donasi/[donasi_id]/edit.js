import { useState, useRef } from "react";
import { useAppContext } from "../../../../../../context/AppContext";
import { dispatchTypes } from "../../../../../../context/AppReducer";
import { useRouter } from "next/router";
import { axiosMain } from "../../../../../../axiosInstances";
import AdminCreateOrEditDonasi from "../../../../../../component/templates/admin/AdminCreateOrEditDonasi";
import ArrowBack from "../../../../../../component/modules/ArrowBack";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)

function AdminSantriDonasiEdit() {
    const router = useRouter();
    const { santri_id, donasi_id } = router.query
    const {
        data: responseDonasi,
    } = useSWR(
        router.isReady ?
            `/admin/donation?id=${donasi_id}` : null,
        fetcher,
    );
    const { dispatch } = useAppContext();
    const [data, setData] = useState({
        name: responseDonasi ? responseDonasi.name : "",
        categories: responseDonasi ? responseDonasi.categories : [],
        description: responseDonasi ? responseDonasi.description : "",
        nominal: responseDonasi ? responseDonasi.nominal : "",
        isActive: responseDonasi ? responseDonasi.isActive : null,
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

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();

        await axiosMain
            .post(`/admin/donation/santri/edit?id=${donasi_id}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Donasi Santri Edited"
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

    if (success) {
        router.push("/admin/santri/"+santri_id+"donasi/")
    }

    return (
        <>
            <ArrowBack href={`/admin/santri/${santri_id}/donasi`} />
            <AdminCreateOrEditDonasi
                form={form}
                handleSubmit={handleSubmit}
                donasi={data}
                createOrEdit="Edit"
                markazOrSantri="Santri"
                handleChange={handleChange}
                handleChangeDonasi={handleChangeDonasi}
                handleIsActive={handleIsActive}
                names={names}
                label="Kebutuhan beasiswa"
                showCategory="none"
            />
        </>
    );
}



export default AdminSantriDonasiEdit;
