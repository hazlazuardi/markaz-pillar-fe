import { useState, useRef } from "react";

import { dispatchTypes } from "../../../../context/AppReducer";
import AdminCreateOrEditSantri from "../../../../component/templates/admin/AdminCreateOrEditSantri";
import useSWR from "swr";
import { axiosFormData, axiosMain } from "../../../../axiosInstances";
import { useAppContext } from "../../../../context/AppContext";
import { useRouter } from "next/router";

const fetcher = url => axiosMain.get(url).then(res => res.data)
function AdminSantriEdit(props) {
    const { santriDetail } = props;
    const router = useRouter()
    const { id } = router.query
    const { data: responseMarkaz, error } = useSWR(`/markaz/search?n=1000`, fetcher)
    const { data: responseSantri, error: errorSantri } = useSWR(`/santri?id=${router.isReady && id}`, fetcher, {
        fallbackData: santriDetail,
        refreshInterval: 10000,
    }
    )
    const { dispatch } = useAppContext();
    const [thumbnail, setThumbnail] = useState({});
    const [santri, setSantri] = useState({
        ...responseSantri.result,
        markaz_id: ""

    });
    const form = useRef(null);

    console.log(santri)
    const handleChangeSantri = ({ target }) => {
        const { name, value } = target;
        setSantri((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData();
        const santriBlob = new Blob([JSON.stringify(santri)], {
            type: "application/json",
        });
        data.append("thumbnail", thumbnail);
        data.append("santri", santriBlob);


        await axiosFormData
            .post(`/admin/santri/edit?id=${santri.markaz_id}`, data)
            .then(response => {
                setLoading(false)

                dispatch({
                    type: dispatchTypes.SNACKBAR_CUSTOM,
                    payload: {
                        severity: 'success',
                        message: "Santri Edited"
                    }
                })
            })
            .catch(e => {
                setLoading(false)
                // Check & Handle if e.response is defined
                if (!!e.response) {
                    // Check & Handle if bad request (empty fields, etc)
                    dispatch({
                        type: dispatchTypes.SNACKBAR_CUSTOM,
                        payload: {
                            severity: 'error',
                            message: 'Incorrect information'
                        }
                    });
                }
            })
    };

    const [loading, setLoading] = useState(false)
    return (
        <AdminCreateOrEditSantri
            handleSubmit={handleSubmit}
            form={form}
            loading={loading}
            santri={santri}
            allMarkaz={!!responseMarkaz && responseMarkaz.result}
            error={error || errorSantri}
            setThumbnail={setThumbnail}
            handleChangeSantri={handleChangeSantri}
            thumbnail={thumbnail}

        />
    );
}

export default AdminSantriEdit;

export async function getStaticProps(context) {
    const id = context.params.id;
    const response = await axiosMain.get(`/santri?id=${id}`);
    const data = response.data
    const staticSantri = data;

    return {
        props: {
            santriDetail: staticSantri,
        },
    };
}

export async function getStaticPaths() {
    const response = await axiosMain.get(`/santri/search?n=1000`)
    const data = await response.data
    const staticAllSantri = data.result;

    const paths = staticAllSantri.map((santri) => ({
        params: { id: santri.id.toString() },
    }));

    return {
        paths: paths,
        fallback: false,
    };
}
