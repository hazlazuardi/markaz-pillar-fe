import React, { useState } from "react";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import useSWR from "swr";
import { axiosMain } from "../../../axiosInstances";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);
export default function AdminUsers() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const {
    data: responsePengguna,
    error,
    mutate,
  } = useSWR(`/admin/user?page=${page - 1}&n=${entries}`, fetcher);

  const TableViewDataPengguna = () => {
    return (
      <TableView
        data={responsePengguna}
        
        //   handleDelete={handleDeleteMarkaz}
        titleTwo="Username"
        titleThree="Email"
        titleFour="Nomor Telpon"
        titleFive="Alamat"
        santriormarkaz="pengguna"
        mutate={mutate}
      />
    );
  };

  if (error)
    return "An error has occurred. Please re-login or try again later.";
  if (!responsePengguna) return "Loading...";

  return (
    <>
      <AdminOrUserTemplate
        variant="pengguna"
        data={responsePengguna}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
        TableView={<TableViewDataPengguna />}
      />
    </>
  );
}
