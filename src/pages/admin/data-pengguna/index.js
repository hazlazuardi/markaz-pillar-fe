import { useState } from "react";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import useSWR from "swr";
import { axiosMain } from "../../../axiosInstances";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchUser, setSearchUser] = useState("");
  const {
    data: responsePengguna,
    error,
    mutate,
  } = useSWR(`/admin/user?page=${page - 1}&n=${entries}&${!!searchUser && "query=" + searchUser}`, fetcher);

  const handleDeletePengguna = async (id) => {
    await axiosMain
      .delete(`/admin/user?id=${id}`)
      .then((response) => {
        mutate();
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
  };

  const TableViewDataPengguna = () => {
    return (
      <TableView
        data={responsePengguna}
        handleDelete={handleDeletePengguna}
        santriormarkaz="pengguna"
        titleTwo="Username"
        titleThree="Email"
        titleFour="Nomor Telpon"
        titleFive="Alamat"
        mutate={mutate}
      />
    );
  };

  return (
    <>
      <AdminOrUserTemplate
        isAdmin
        variant="pengguna"
        data={responsePengguna}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
        error={error}
        mutate={mutate}
        searchTerm={searchUser}
        setSearchTerm={setSearchUser}
        TableView={<TableViewDataPengguna />}
      />
    </>
  );
}
