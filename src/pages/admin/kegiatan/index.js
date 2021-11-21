import { useState } from "react";
import { axiosMain } from "../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import GridViewVolunteer from "../../../component/templates/admin/GridViewVolunteer";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminVolunteer(props) {
  // const { allProgram } = props;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchProgram, setSearchProgram] = useState("");
  const [locationFilter, setLocationFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [categoryFilter2, setCategoryFilter2] = useState();
  const [categoryFilter3, setCategoryFilter3] = useState();
  const {
    data: responseProgram,
    error,
    mutate,
  } = useSWR(
    `/volunteer?page=${page - 1}&n=${entries}&${
      !!searchProgram && "name=" + searchProgram
    }
`,
    fetcher
    // {
    //   fallbackData: allProgram,
    //   refreshInterval: 30000,
    // }
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

  const GridViewAdminVolunteer = () => {
    return (
      <GridViewVolunteer
        data={responseProgram}
        detail="admin/volunteer"
        handleDelete={handleDeleteMarkaz}
        markazOrSantri="kegiatan"
      />
    );
  };

  const TableViewAdminVolunteer = () => {
    return (
      <TableView
        data={responseProgram}
        detail="admin/volunteer"
        handleDelete={handleDeleteMarkaz}
        santriormarkaz="kegiatan"
        titleTwo="Volunteer Dibutuhkan"
        titleThree="Volunteer Saat Ini"
        titleFour="Lokasi"
      />
    );
  };

  return (
    <>
      <AdminOrUserTemplate
        isAdmin
        variant="kegiatan"
        GridView={<GridViewAdminVolunteer />}
        TableView={<TableViewAdminVolunteer />}
        entries={entries}
        setEntries={setEntries}
        searchTerm={searchProgram}
        setSearchTerm={setSearchProgram}
        page={page}
        setPage={setPage}
        data={responseProgram}
        error={error}
        hrefCreate="/admin/volunteer/create"
        mutate={mutate}
      />
    </>
  );
}
