import ShowAllTemplate from "../../../../component/templates/show_all/ShowAll";
import { useState } from "react";
import Button from "@mui/material/Button";
import GridView from "../../../../component/templates/admin/admin-grid";
import TableView from "../../../../component/templates/admin/Admin-table";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import { axiosMain } from "../../../../axiosInstances";
import useSWR from "swr";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function DonasiMarkaz() {
  const {
    data: markazs,
    error,
    mutate,
  } = useSWR("/markaz/search?sortedAge=DESC", fetcher);
  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState(10);

  const [gridView, setGridView] = useState(true);

  const gridview = (
    <Button
      style={{
        color: "#004f5d",
        backgroundColor: "#ffffff",
        fontWeight: "bold",
        textDecoration: "underline",
      }}
      onClick={() => setGridView(true)}
    >
      Grid View
    </Button>
  );
  const tableview = (
    <Button
      style={{
        color: "#004f5d",
        backgroundColor: "#ffffff",
        fontWeight: "bold",
        textDecoration: "underline",
      }}
      onClick={() => setGridView(false)}
    >
      Table View
    </Button>
  );

  const create = (
    <Link href="markaz/create" underline="none">
      <Fab
        sx={{ position: "fixed", right: "3em", bottom: "3em" }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Link>
  );
  // console.log(staticData);

  const search = () => {
    markazs.result &&
      markazs.result.filter((data) => {
        if (searchTerm == "") {
          return data;
        } else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return data;
        }
      });
  };

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

  if (error) return "An error has occurred.";
  if (!markazs) return "Loading...";
  return (
    <ShowAllTemplate
      searchBarName="Cari Markaz"
      markazOrSantri="Donasi"
      page={page}
      setPage={setPage}
      value={value}
      setValue={setValue}
      setSearchTerm={setSearchTerm}
      add={create}
      setGridView={setGridView}
    >
      <TableView
        data={markazs}
        santriormarkaz="donasim"
        detail="admin/markaz"
        tableTempatMarkaz="ID Donasi"
        tableDomisili="Nominal Donasi"
        tableJenisKelamin="Jumlah Donasi Terkumpul"
        tableTanggalLahir="Status"
        isDonasi
      />
    </ShowAllTemplate>
  );
}
