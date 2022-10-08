import { useState } from "react";
import TableView from "../../../../../component/templates/admin/TableView";
import { axiosMain } from "../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import AdminOrUserTemplate from "../../../../../component/templates/admin/AdminOrUserTemplate";
import ArrowBack from "../../../../../component/modules/ArrowBack";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function DonasiSantri() {
  const router = useRouter();
  const { santri_id } = router.query;
  const [searchDonasiSantri, setSearchDonasiSantri] = useState("");
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: responseDonasiSantri, error } = useSWR(
    router.isReady
      ? `/admin/donation/santri?id=${santri_id}&page=${page - 1}&n=${entries}&${
          !!searchDonasiSantri && "s=" + searchDonasiSantri
        }`
      : null,
    fetcher
  );

  const TableViewSantriDonasi = (
    <TableView
      data={responseDonasiSantri}
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
      <ArrowBack href={`/admin/santri/${santri_id}`} />
      <AdminOrUserTemplate
        variant="donasi"
        TableView={TableViewSantriDonasi}
        data={responseDonasiSantri}
        searchTerm={searchDonasiSantri}
        setSearchTerm={setSearchDonasiSantri}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
        hrefCreate={`/admin/santri/${santri_id}/donasi/create`}
      />
    </>
  );
}
