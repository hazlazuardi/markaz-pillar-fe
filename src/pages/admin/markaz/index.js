import { useState } from "react";
import { axiosMain } from '../../../axiosInstances'
import useSWR from "swr";

import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";

import GridView from "../../../component/templates/admin/admin-grid";
import TableView from "../../../component/templates/admin/admin-table";

const fetcher = url => axiosMain.get(url).then(res => res.data)

export default function AdminMarkaz() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: markazs, error, mutate } = useSWR(`/markaz/search?page=${page - 1}&n=${entries}`, fetcher)

  // *******************************************************
  // Delete
  // *******************************************************
  const handleDelete = async (id) => {
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





  return (
    <>
      <AdminOrUserTemplate
        GridView={<GridView data={markazs} detail="admin/markaz" handleDelete={handleDelete} />}
        TableView={<TableView data={markazs} detail="admin/markaz" handleDelete={handleDelete} />}
        entries={entries}
        setEntries={setEntries}
        page={page}
        setPage={setPage}
        data={markazs}
        error={error}
      />
    </>
  );
}
