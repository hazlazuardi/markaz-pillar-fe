import { useState } from "react";
import TableView from "../../../../../component/templates/admin/TableView";
import { axiosMain } from "../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import AdminOrUserTemplate from "../../../../../component/templates/admin/AdminOrUserTemplate";
import ArrowBack from "../../../../../component/modules/ArrowBack";
import { enumRoutes } from "../../../../../context/AppReducer";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function DonasiMarkaz(props) {
  const router = useRouter();
  const { markaz_id } = router.query;
  const [searchDonasiMarkaz, setSearchDonasiMarkaz] = useState("");
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: responseDonasiMarkaz, error } = useSWR(
    router.isReady
      ? `/admin/donation/markaz?id=${markaz_id}&page=${page - 1}&n=${entries}&${
          !!searchDonasiMarkaz && "s=" + searchDonasiMarkaz
        }`
      : null,
    fetcher
  );

  const TableViewMarkazDonasi = (
    <TableView
      data={responseDonasiMarkaz}
      santriormarkaz="donasi"
      titleTwo="ID Donasi"
      titleThree="Nominal Donasi"
      titleFour="Jumlah Donasi Terkumpul"
      titleFive="Status"
    />
  );

  if (error) return "An error has occurred.";
  return (
    <>
      <ArrowBack href={`${enumRoutes.ADMIN_MARKAZ}/${markaz_id}`} />
      <AdminOrUserTemplate
        variant="donasi"
        TableView={TableViewMarkazDonasi}
        data={responseDonasiMarkaz}
        searchTerm={searchDonasiMarkaz}
        setSearchTerm={setSearchDonasiMarkaz}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
        hrefCreate={`${enumRoutes.ADMIN_MARKAZ}/${markaz_id}/donasi/create`}
      />
    </>
  );
}
