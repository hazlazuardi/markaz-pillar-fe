import { useState } from "react";
import { axiosMain } from "../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../component/templates/admin/AdminOrUserTemplate";
import GridView from "../../../component/templates/admin/GridView";
import TableView from "../../../component/templates/admin/TableView";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AdminKegiatan() {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchProgram, setSearchProgram] = useState("");
  const [status, setStatus] = useState("")
  const {
    data: responseProgram,
    error,
    mutate,
  } = useSWR(
    `/volunteer?page=${page - 1}&n=${entries}&${!!searchProgram && "name=" + searchProgram
    }&${!!status ? "status=" + status : ""}

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
      .delete(`/admin/volunteer?id=${id}`)
      .then((response) => {
        mutate();
      })
  };

  const changeStatus = async (ids, status) => {
    return axiosMain.post(`/admin/volunteer/edit/status?id=${ids}`, {
      status: `${status}`,
    });
  };

  const GridViewAdminVolunteer = () => {
    return (
      <GridView
        data={responseProgram}
        detail="admin/kegiatan"
        handleDelete={handleDeleteMarkaz}
        variant="kegiatan"
      />
    );
  };

  const TableViewAdminVolunteer = () => {
    return (
      <TableView
        data={responseProgram}
        detail="kegiatan"
        handleDelete={handleDeleteMarkaz}
        santriormarkaz="kegiatan"
        titleTwo="Status"
        titleThree="Volunteer Dibutuhkan"
        titleFour="Volunteer Saat Ini"
        titleFive="Lokasi"
        dialogType="statusKegiatan"
        mutate={mutate}
        apiCall={changeStatus}
      />
    );
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    mutate();
  };

  const radioStatus = [
    {
      title: "Status",
      value: status,
      onChange: handleChangeStatus,
      labels: [
        {
          value: "MEMBUKA_PENDAFTARAN",
          label: "Membuka Pendaftaran",
        },
        { value: "MENUTUP_PENDAFTARAN", label: "Menutup Pendaftaran" },
        { value: "SUDAH_DILAKSANAKAN", label: "Sudah Dilaksanakan" },
      ],
    },
  ];

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
        hrefCreate="/admin/kegiatan/create"
        FilterRadioObject={radioStatus}
        mutate={mutate}
      />
    </>
  );
}
