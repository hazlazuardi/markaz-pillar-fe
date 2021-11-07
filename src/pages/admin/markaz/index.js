import { useState } from "react";
import { axiosMain } from '../../../axiosInstances'
import useSWR from "swr";

import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../../component/templates/admin/GridView";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = url => axiosMain.get(url).then(res => {
  console.log(res);
  return res.data

})

export default function AdminMarkaz() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: responseMarkaz, error, mutate } = useSWR(`/markaz/search?page=${page - 1}&n=${entries}`, fetcher)

  // *******************************************************
  // Delete
  // *******************************************************
  const handleDeleteMarkaz = async (id) => {
    await axiosMain.delete(`/admin/markaz?id=${id}`)
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
    <GridView data={responseMarkaz} detail="admin/markaz" handleDelete={handleDeleteMarkaz} />
  )


  const TableViewMarkaz = (
    <TableView data={responseMarkaz} detail="admin/markaz" handleDelete={handleDeleteMarkaz} />
  )


  return (
    <>
      <AdminOrUserTemplate
        isAdmin
        variant='markaz'
        GridView={GridViewMarkaz}
        TableView={TableViewMarkaz}
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
