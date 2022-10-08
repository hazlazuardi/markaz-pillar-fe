import { useState } from "react";
import { axiosMain } from "../../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../../component/templates/admin/AdminOrUserTemplate";
import GridView from "../../../../component/templates/admin/GridView";
import TableView from "../../../../component/templates/admin/TableView";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AdminRelawan(props) {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchVolunteer, setSearchVolunteer] = useState("");
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState();
  const [statusFilter1, setStatusFilter1] = useState();
  const [statusFilter2, setStatusFilter2] = useState();
  const [statusFilter3, setStatusFilter3] = useState();
  const { kegiatan_id } = router.query;
  const {
    data: responseVolunteer,
    error,
    mutate,
  } = useSWR(
    router.isReady
      ? `/admin/volunteer/registration?page=${
          page - 1
        }&n=${entries}&id=${kegiatan_id}&name=${searchVolunteer}&${
          !!statusFilter1 ? "status=" + statusFilter1 : ""
        }&${
          !!statusFilter2 ? "status=" + statusFilter2 : ""
        }&${
          !!statusFilter3 ? "status=" + statusFilter3 : ""
        }
`
      : null,
    fetcher
  );

  // useEffect(() => {
  //   mutate();
  // }, [statusFilter, mutate]);

  //

  const changeStatus = async (ids, status) => {
    return axiosMain.post(`/admin/volunteer/registration/status?id=${ids}`, {
      status: `${status}`,
    });
  };

  const GridViewAdminVolunteerDetail = () => {
    return <GridView data={responseVolunteer} variant="relawan" disableCTA />;
  };

  const TableViewAdminVolunteerDetail = () => {
    return (
      <TableView
        data={responseVolunteer}
        // detail="admin/kegiatan"
        santriormarkaz="volunteer"
        titleTwo="Nomor KTP"
        titleThree="Email"
        titleFour="Nomor Telpon"
        titleFive="Status"
        apiCall={changeStatus}
        mutate={mutate}
        dialogType="statusVolunteer"
      />
    );
  };

  const handleChangeStatus = (event) => {
    setStatusFilter(event.target.value);
    mutate();
  };

  const radioRegister = [
    {
      title: "Status",
      value: statusFilter,
      onChange: handleChangeStatus,
      labels: [
        {
          value: "MENUNGGU_KONFIRMASI",
          label: "Menunggu Konfirmasi",
        },
        { value: "PENDAFTARAN_DITERIMA", label: "Pendaftaran Diterima" },
        { value: "PENDAFTARAN_DITOLAK", label: "Pendaftaran Ditolak" },
      ],
    },
  ];

  return (
    <>
      <ArrowBack href={"/admin/kegiatan"} />
      <AdminOrUserTemplate
        isAdmin
        variant="relawan"
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
        mutate={mutate}
        FilterRadioObject={radioRegister}
        statusFilter1={statusFilter1}
        statusFilter2={statusFilter2}
        statusFilter3={statusFilter3}
        setStatusFilter1={setStatusFilter1}
        setStatusFilter2={setStatusFilter2}
        setStatusFilter3={setStatusFilter3}
      />
    </>
  );
}
