import React from "react";
import ShowAllTemplate from "../../../component/templates/show_all/ShowAll";
import { useState } from "react";
import Button from "@mui/material/Button";
import GridView from "../../../component/templates/admin/admin-grid";
import TableView from "../../../component/templates/admin/admin-table";
import AdminTemplate from "../../../component/templates/admin/AdminTemplate";

const BASE_URL = process.env.BACKEND_HOST;

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
  const { responseUsers } = props;
  console.log("res", responseUsers);
  const [gridView, setGridView] = useState(true);
  const notFound = false;
  try {
    notFound = props.notFound;
  } catch {
    console.log(responseUsers);
  }

  const [value, setValue] = useState(10);

  const [error, setError] = useState({
    status: 201,
    statusText: "",
  });

  const [page, setPage] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  const [allData, setAllData] = useState([]);

  const [data, setData] = useState([]);

  const getAllData = async (event) => {
    await fetch(`${BASE_URL}/${markazOrSantri.toLowerCase()}/search`, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    }).then((preResponse) => {
      preResponse.json().then((data) => {
        setAllData(data.result);
      });
    });
  };

  const getData = async (event) => {
    await fetch(
      `${BASE_URL}/${markazOrSantri.toLowerCase()}/search?page=${page}&n=${value}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      }
    ).then((preResponse) => {
      preResponse.json().then((data) => {
        setData(data);
      });
    });
  };

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

  return (
    <AdminTemplate
      searchBarName="Cari Markaz"
      view1={gridview}
      view2={tableview}
      markazOrSantri="Markaz"
    >
      <div>
        {gridView ? (
          <GridView data={responseUsers} />
        ) : (
          <TableView data={responseUsers} />
        )}
      </div>
    </AdminTemplate>
  );
}
