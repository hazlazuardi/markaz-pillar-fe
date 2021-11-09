import ShowAllTemplate from "../../../../../component/templates/show_all/ShowAll";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TableView from "../../../../../component/templates/admin/TableView";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import { axiosMain } from "../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import AdminOrUserTemplate from "../../../../../component/templates/admin/AdminOrUserTemplate";
import ArrowBack from "../../../../../component/modules/ArrowBack";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function DonasiMarkaz() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10)
  const {
    data: allMarkaz,
    error,
  } = useSWR(`/admin/donation/markaz?id=${id}&page=${page - 1}&n=${entries}`, fetcher);

  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState(10);

  const [gridView, setGridView] = useState(true);

  const [iddonasi, setId] = useState();

  useEffect(() => {
    setId(router.query.id);
  }, [router]);

  const handleDelete = async (id) => {
    await axiosMain
      .delete(`/admin/markaz?id=${id}`)
      .then((response) => {
        console.log("delete succeed", response.data);
        mutate();
      })
      .catch((e) => {
        console.log("delete error", e.response);
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
  };

  const TableViewMarkazDonasi = (
    <TableView
      data={allMarkaz}
      santriormarkaz="donasi"
      detail="admin/markaz"
      tableTempatMarkaz="ID Donasi"
      tableDomisili="Nominal Donasi"
      tableJenisKelamin="Jumlah Donasi Terkumpul"
      tableTanggalLahir="Status"
      isDonasi
      iddonasi={iddonasi}
    />
  )
  console.log(allMarkaz)
  if (error) return "An error has occurred.";
  if (!allMarkaz) return "Loading...";
  return (
    <>
      <ArrowBack href='/admin/markaz' />
      <AdminOrUserTemplate
        isAdmin
        variant='donasi'
        TableView={TableViewMarkazDonasi}
        data={allMarkaz}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
        hrefCreate={`/admin/markaz/donasi/create/${id}`}
      />
    </>
  );
}
