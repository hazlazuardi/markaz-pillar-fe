import { useState } from "react";
import TableView from "../../../../../../component/templates/admin/TableView";
import { axiosMain } from "../../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import AdminOrUserTemplate from "../../../../../../component/templates/admin/AdminOrUserTemplate";
import ArrowBack from "../../../../../../component/modules/ArrowBack";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function TransaksiMarkaz() {
  const router = useRouter();
  const { transid } = router.query;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: markazs, error } = useSWR(
    "/admin/transaction?page=0&n=10&id=" + transid,
    fetcher
  );

  const TableViewMarkazTransaksi = (
    <TableView
      data={markazs}
      santriormarkaz="transaksi"
      detail="admin/markaz"
      tableTempatMarkaz="ID Transaksi"
      tableDomisili="Nominal Donasi"
      tableJenisKelamin="Status"
      isDonasi
    />
  );

  if (error)
    return "An error has occurred. Please re-login or try again later.";
  if (!markazs) return "Loading...";
  return (
    <>
      <ArrowBack href="/admin/markaz" />
      <AdminOrUserTemplate
        isAdmin
        variant="donasi"
        TableView={TableViewMarkazTransaksi}
        data={markazs}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
      />
    </>
  );
}
