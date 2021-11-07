import { useState } from "react";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";

import AdminOrUserTemplate from "../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../component/templates/admin/GridView";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function Santri(props) {
  const { allSantri } = props;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: responseSantri, error } = useSWR(
    `/santri/search?page=${page - 1}&n=${entries}`,
    fetcher,
    { fallbackData: allSantri, refreshInterval: 30000 }
  );
  const GridViewMarkaz = <GridView data={responseSantri} detail="santri" />;

  return (
    <>
      <AdminOrUserTemplate
        variant="santri"
        GridView={GridViewMarkaz}
        entries={entries}
        setEntries={setEntries}
        page={page}
        setPage={setPage}
        data={responseSantri}
        error={error}
      />
    </>
  );
}

export async function getStaticProps() {
  const staticAllSantriResponse = await axiosMain.get("/santri/search?n=1000");
  const staticAllSantri = staticAllSantriResponse.data;
  return {
    props: {
      allSantri: staticAllSantri,
    },
    revalidate: 10,
  };
}
