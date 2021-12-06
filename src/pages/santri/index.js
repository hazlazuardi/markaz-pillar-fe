import { useState, useEffect } from "react";
import { axiosMain } from "../../axiosInstances";
import useSWR from "swr";

import AdminOrUserTemplate from "../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../component/templates/admin/GridView";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function Santri(props) {
  const { allSantri } = props;
  const [searchSantri, setSearchSantri] = useState("");
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [sort, setSort] = useState("NAME_ASC");
  const {
    data: responseSantri,
    error,
    mutate,
  } = useSWR(
    `/santri/search?${!!sort ? "sort=" + sort : ""}&page=${page - 1}&n=${entries}&${
      !!searchSantri && "name=" + searchSantri
    }`,
    fetcher,
    { fallbackData: allSantri, refreshInterval: 30000 }
  );

  useEffect(() => {
    mutate();
  }, [sort, mutate]);

  const GridViewSantri = () => {
    return (
      <GridView data={responseSantri} variant="santri" />
    );
  };

  const handleChangeSort = (event) => {
    setSort(event.target.value);
    mutate();
  };

  const radioSantri = [
    {
      title: "Urutkan",
      value: sort,
      onChange: handleChangeSort,
      labels: [
        {
          value: "NAME_ASC",
          label: "Abjad A-Z",
        },
        { value: "NAME_DESC", label: "Abjad Z-A" },
        {value: "AGE_ASC",
          label: "Umur Tertua",
        },
        { value: "AGE_DESC", label: "Umur Termuda" },
      ],
    },
  ];

  return (
    <>
      <AdminOrUserTemplate
        variant="santri"
        GridView={<GridViewSantri/>}
        entries={entries}
        setEntries={setEntries}
        searchTerm={searchSantri}
        setSearchTerm={setSearchSantri}
        page={page}
        setPage={setPage}
        data={responseSantri}
        error={error}
        sort={sort}
        setSort={setSort}
        mutate={mutate}
        FilterRadioObject={radioSantri}
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
