import { useState } from "react";
import { axiosMain } from '../../../axiosInstances'
import useSWR from "swr";

import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../../component/templates/admin/GridView";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = url => axiosMain.get(url).then(res => res.data)

export default function AdminSantri() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: responseSantri, error, mutate } = useSWR(`/santri/search?page=${page - 1}&n=${entries}`, fetcher)

  // *******************************************************
  // Delete
  // *******************************************************
  const handleDeleteSantri = async (id) => {
    await axiosMain.delete(`/admin/santri?id=${id}`)
      .then(response => {
        mutate();
      })
      .catch(e => {

        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      })
  }

  const GridViewMarkaz = (
    <GridView data={responseSantri} detail="admin/santri" handleDelete={handleDeleteSantri} />
  )


  const TableViewMarkaz = (
    <TableView data={responseSantri} detail="admin/santri" handleDelete={handleDeleteSantri} />
  )




  return (
    <>
      <AdminOrUserTemplate
        isAdmin
        variant='santri'
        GridView={GridViewMarkaz}
        TableView={TableViewMarkaz}
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
