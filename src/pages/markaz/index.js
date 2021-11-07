import { useState } from "react";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";

import AdminOrUserTemplate from "../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../component/templates/admin/GridView";

const fetcher = url => axiosMain.get(url).then(res => res.data)

export default function Markaz(props) {
    const { allMarkaz } = props;
    const [page, setPage] = useState(1);
    const [entries, setEntries] = useState(10);
    const { data: responseMarkaz, error, mutate } = useSWR(`/markaz/search?page=${page - 1}&n=${entries}`, fetcher, { fallbackData: allMarkaz, refreshInterval: 30000 })

    const GridViewMarkaz = (
        <GridView data={responseMarkaz} detail="markaz" />
    )

    return (
        <>
            <AdminOrUserTemplate
                variant='markaz'
                GridView={GridViewMarkaz}
                entries={entries}
                setEntries={setEntries}
                page={page}
                setPage={setPage}
                data={responseMarkaz}
                error={error}
            />
        </>
    );
}


export async function getStaticProps() {
    const staticMarkazResponse = await axiosMain.get("/markaz/search?n=1000");
    const staticMarkaz = staticMarkazResponse.data
    return {
        props: {
            allMarkaz: staticMarkaz
        },
        revalidate: 10
    }
}
