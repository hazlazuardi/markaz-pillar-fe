import React from "react";
import ShowAllTemplate from "../../../../component/templates/show_all/ShowAll";
import { useState } from "react";
import Button from "@mui/material/Button";
import TableView from "../../../../component/templates/admin/admin-table";
import AdminTemplate from "../../../../component/templates/admin/AdminTemplate";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { axiosMain } from "../../../../axiosInstances";
import useSWR from "swr";

const fetcher = url => axiosMain.get(url).then(res => res.data)
export default function AdminSantri() {
  const { data: santris, error, mutate } = useSWR("/santri/search", fetcher)

  const notFound = false;
  try {
    notFound = props.notFound;
  } catch {}

  const [value, setValue] = useState(10);

  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const create = (
    <Link href="santri/create" underline="none">
      <Fab
        sx={{ position: "fixed", right: "3em", bottom: "3em" }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Link>
  );

  const search = () => {
    santris.result &&
      santris.result.filter((data) => {
        if (searchTerm == "") {
          return data;
        } else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return data;
        }
      });
  };

  const handleDelete = async (id) => {
    await axiosMain.delete(`/admin/santri?id=${id}`)
      .then(response => {
        console.log('delete succeed', response.data);
        mutate();
      })
      .catch(e => {
        console.log('delete error', e.response)
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      })
  }

  console.log(error)
  if (error) return "An error has occurred.";
  if (!santris) return "Loading...";
  return (
    <ShowAllTemplate
      searchBarName="Cari pengguna"
      markazOrSantri="Transaksi Markaz"
      page={page}
      setPage={setPage}
      value={value}
      setValue={setValue}
      setSearchTerm={setSearchTerm}
      add={create}
    >
    &nbsp;
    <TableView
      data={santris}
      santriormarkaz="markaz"
      detail="admin/santri"
      tableDomisili="Nominal"
      tableTanggalLahir="Status"
    />
    </ShowAllTemplate>
  );
}
