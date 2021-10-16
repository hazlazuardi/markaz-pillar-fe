import React from "react";
import ShowAllTemplate from "../../../component/templates/show_all/ShowAll";
import { useState } from "react";
import Button from "@mui/material/Button";
import GridView from "../../../component/templates/admin/admin-grid";
import TableView from "../../../component/templates/admin/admin-table";
import AdminTemplate from "../../../component/templates/admin/AdminTemplate";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Link from "@mui/material/Link";
import Template from "../../../component/templates/show_all/ShowAll";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_HOST;

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${BASE_URL}/markaz/search?sortedAge=DESC`);
    const data = await res.json();

    return {
      props: { responseUsers: data }, // will be passed to the page component as props
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
export default function AdminMarkaz(props) {
  const { responseUsers, markaz } = props;

  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [value, setValue] = useState(10);

  const [gridView, setGridView] = useState(true);
  const notFound = false;
  try {
    notFound = props.notFound;
  } catch {}

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
  // console.log(responseUsers);

  const search = () => {
    responseUsers.result &&
      responseUsers.result.filter((data) => {
        if (searchTerm == "") {
          return data;
        } else if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return data;
        }
      });
  };

  return (
    <ShowAllTemplate
      searchBarName="Cari Markaz"
      markazOrSantri="Markaz"
      page={page}
      setPage={setPage}
      value={value}
      setValue={setValue}
      setSearchTerm={setSearchTerm}
      add={create}
      isAdmin
      setGridView={setGridView}
    >
      {gridView ? (
        <GridView
          data={responseUsers}
          intr1Butt="admin/markaz/edit"
          markazOrSantri="admin/markaz/delete"
          detail="admin/markaz"
        />
      ) : (
        <TableView
          data={responseUsers}
          santriormarkaz="markaz"
          detail="admin/markaz"
          tableTempatMarkaz="Kategori"
          tableDomisili="Nominal"
          tableJenisKelamin="Contact Person"
          tableTanggalLahir="Kontak"
        />
      )}
    </ShowAllTemplate>
  );
}
