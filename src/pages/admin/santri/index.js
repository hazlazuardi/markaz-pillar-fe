import { useState } from "react";
import { axiosMain } from "../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import GridView from "../../../component/templates/admin/GridView";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AdminSantri(props) {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchSantri, setSearchSantri] = useState("");
  const [sort, setSort] = useState("NAME_ASC");
  const {
    data: responseSantri,
    error,
    mutate,
  } = useSWR(
    `/santri/search?page=${page - 1}&n=${entries}&${
      !!sort ? "sort=" + sort: ""
    }&${!!searchSantri && "name=" + searchSantri}
    `,
    fetcher
    // {
    //   fallbackData: allSantri,
    //   refreshInterval: 30000,
    // }
  );

  // *******************************************************
  // Delete
  // *******************************************************
  const handleDeleteSantri = async (id) => {
    await axiosMain
      .delete(`/admin/santri?id=${id}`)
      .then((response) => {
        mutate();
      })
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


  const GridViewAdminSantri = () => {
    return (
      <GridView
        variant='santri'
        data={responseSantri}
        detail="admin/santri"
        handleDelete={handleDeleteSantri}
      />
    );
  };

  const TableViewAdminSantri = () => {
    return (
      <TableView
        data={responseSantri}
        detail="santri"
        handleDelete={handleDeleteSantri}
        santriormarkaz="santri"
        titleTwo="Tempat Markaz"
        titleThree="Domisili"
        titleFour="Jenis Kelamin"
        titleFive="Tanggal Lahir"
        mutate={mutate}
      />
    );
  };

  return (
    <>
      <AdminOrUserTemplate
        isAdmin
        variant="santri"
        GridView={<GridViewAdminSantri />}
        TableView={<TableViewAdminSantri />}
        entries={entries}
        searchTerm={searchSantri}
        setSearchTerm={setSearchSantri}
        setEntries={setEntries}
        page={page}
        setPage={setPage}
        data={responseSantri}
        error={error}
        hrefCreate="/admin/santri/create"
        sort={sort}
        setSort={setSort}
        mutate={mutate}
        FilterRadioObject={radioSantri}
      />
    </>
  );
}
