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
  const { data: markazs, error } = useSWR(router.isReady ? 
    `/admin/transaction?page=${page - 1}&n=${entries}&id=${transid}` : null,
    fetcher
  );

  const TableViewSantriTransaksi = (
    <TableView
      data={markazs}
      santriormarkaz="transaksi"
      detail="admin/markaz"
      tableTempatMarkaz="ID Transaksi"
      tableDomisili="Nominal Donasi"
      tableJenisKelamin="Status"
    />
  );

  const { id } = router.query
  if (error)
    return "An error has occurred. Please re-login or try again later.";
  if (!markazs) return "Loading...";
  return (
    <>
      <ArrowBack href={"/admin/santri/donasi/"+id} />
      <AdminOrUserTemplate
        isAdmin
        disableSearch
        variant="transaksi"
        TableView={TableViewSantriTransaksi}
        data={markazs}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
      />
    </>
  );
}
