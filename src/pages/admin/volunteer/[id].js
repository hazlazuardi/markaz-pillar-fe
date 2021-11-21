import { useState } from "react";
import { axiosMain } from "../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import GridView from "../../../component/templates/admin/GridView";
import TableView from "../../../component/templates/admin/TableView";
import { ArrowBack } from "@mui/icons-material";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminMarkaz(props) {
  const { allVolunteer } = props;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchVolunteer, setSearchVolunteer] = useState("")
  const [locationFilter, setLocationFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [categoryFilter2, setCategoryFilter2] = useState();
  const [categoryFilter3, setCategoryFilter3] = useState();
  const {
    data: responseVolunteer,
    error,
    mutate,
  } = useSWR(
    `/markaz/search?page=${page - 1}&n=${entries}&${!!locationFilter ? "address=" + locationFilter : ""
    }${!!nameFilter ? "sortedName=" + nameFilter : ""}${!!categoryFilter ? "category=" + categoryFilter : ""
    }&${!!categoryFilter2 ? "category=" + categoryFilter2 : ""}&${!!categoryFilter3 ? "category=" + categoryFilter3 : ""
    }&${!!searchVolunteer && "name=" + searchVolunteer}
`,
    fetcher,
    {
      fallbackData: allVolunteer,
      refreshInterval: 30000,
    }
  );

  // *******************************************************
  // Delete
  // *******************************************************
  const handleDeleteMarkaz = async (id) => {
    await axiosMain
      .delete(`/admin/markaz?id=${id}`)
      .then((response) => {
        mutate();
      })
      .catch((e) => {
        if (e.response.data.status === 401) {
          localStorage.clear();
        }
      });
  };

  const GridViewAdminVolunteerDetail = () => {
    return (
      <GridView
        data={responseVolunteer}
        detail="admin/markaz"
        handleDelete={handleDeleteMarkaz}
      />
    )
  };

  const TableViewAdminVolunteerDetail = () => {
    return (
      <TableView
        data={responseVolunteer}
        detail="admin/markaz"
        handleDelete={handleDeleteMarkaz}
        santriormarkaz="volunteer"
        tableTempatMarkaz="Nomor KTP"
        tableDomisili="Email"
        tableJenisKelamin="Nomor Telpon"
        tableTanggalLahir="Status"
      />
    )
  }

  return (
    <>
      <ArrowBack href={"/admin/volunteer"} />
      <AdminOrUserTemplate
        isAdmin
        variant="volunteer"
        GridView={<GridViewAdminVolunteerDetail />}
        TableView={<TableViewAdminVolunteerDetail />}
        entries={entries}
        setEntries={setEntries}
        searchTerm={searchVolunteer}
        setSearchTerm={setSearchVolunteer}
        page={page}
        setPage={setPage}
        data={responseVolunteer}
        error={error}
        hrefCreate="/admin/markaz/create"
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categoryFilter2={categoryFilter2}
        setCategoryFilter2={setCategoryFilter2}
        categoryFilter3={categoryFilter3}
        setCategoryFilter3={setCategoryFilter3}
        mutate={mutate}
      />
    </>
  );
}
