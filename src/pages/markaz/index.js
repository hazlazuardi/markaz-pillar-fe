import { useState } from "react";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";

import AdminOrUserTemplate from "../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../component/templates/admin/GridView";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function Markaz(props) {
  const { allMarkaz } = props;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [locationFilter, setLocationFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();

  const {
    data: responseMarkaz,
    error,
    mutate,
  } = useSWR(
    `/markaz/search?page=${page - 1}&n=${entries}&${
      !!locationFilter ? "address=" + locationFilter : ""
    }${!!nameFilter ? "sortedName=" + nameFilter : ""}${
      !!categoryFilter ? "category=" + categoryFilter : ""
    }
`,
    fetcher,
    {
      fallbackData: allMarkaz,
      refreshInterval: 30000,
    }
  );

  const GridViewMarkaz = (
    <GridView data={responseMarkaz} detail="admin/markaz" />
  );

  return (
    <>
      <AdminOrUserTemplate
        variant="markaz"
        GridView={GridViewMarkaz}
        entries={entries}
        setEntries={setEntries}
        page={page}
        setPage={setPage}
        data={responseMarkaz}
        error={error}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        mutate={mutate}
      />
    </>
  );
}

export async function getStaticProps() {
  const staticMarkaz = await axiosMain.get("/markaz/search?n=1000");
  return {
    props: {
      allMarkaz: staticMarkaz.data,
    },
    revalidate: 10,
  };
}
