import { useState } from "react";

import AdminCreateOrEditSantri from "../../../../component/templates/admin/AdminCreateOrEditSantri";
import useSWR from "swr";
import { axiosFormData, axiosMain } from "../../../../axiosInstances";
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
    const [santri, setSantri] = useState({
        ...responseSantri.result,
        markaz_id: ""

    });

    console.log(santri)

    const editSantri = async (markazId, data) => {
        return axiosFormData.post(`/admin/santri/edit?id=${markazId}`, data)
    };

    return (
        <AdminCreateOrEditSantri
            apiCall={editSantri}
            santri={santri}
            setSantri={setSantri}
            allMarkaz={!!responseMarkaz && responseMarkaz.result}
            error={error || errorSantri}
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
