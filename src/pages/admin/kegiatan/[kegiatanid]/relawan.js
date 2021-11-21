import { useEffect, useState } from "react";
import { axiosMain } from "../../../../axiosInstances";
import useSWR from "swr";
import AdminOrUserTemplate from "../../../../component/templates/admin/AdminOrUserTemplate";
import GridView from "../../../../component/templates/admin/GridView";
import TableView from "../../../../component/templates/admin/TableView";
import ArrowBack from "../../../../component/modules/ArrowBack";
import { useRouter } from "next/router";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function AdminMarkaz(props) {
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const [searchVolunteer, setSearchVolunteer] = useState("");
  const [locationFilter, setLocationFilter] = useState();
  const [nameFilter, setNameFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [categoryFilter2, setCategoryFilter2] = useState();
  const [categoryFilter3, setCategoryFilter3] = useState();
  const router = useRouter();
  const { id } = router.query;
  const {
    data: responseVolunteer,
    error,
    mutate,
  } = useSWR(
    router.isReady
      ? `/admin/volunteer/registration?page=${page - 1}&n=${entries}&id=${id}
`
      : null,
    fetcher
  );

  // console.log(!!responseVolunteer ? responseVolunteer.result : "");

  const changeStatus = async (ids, status) => {
    return axiosMain.post(`/admin/volunteer/registration/status?id=${ids}`, {
      status: `${status}`,
    });
  };

  const GridViewAdminVolunteerDetail = () => {
    return <GridView data={responseVolunteer} detail="admin/markaz" />;
  };

  const TableViewAdminVolunteerDetail = () => {
    return (
      <TableView
        data={responseVolunteer}
        detail="admin/markaz"
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

  return (
    <>
      <ArrowBack href={"/admin/kegiatan"} />
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
        hrefCreate="/admin/volunteer/create"
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
