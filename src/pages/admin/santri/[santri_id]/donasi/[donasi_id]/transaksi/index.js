import { useState } from "react";
import TableView from "../../../../../../../component/templates/admin/TableView";
import { axiosMain } from "../../../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import AdminOrUserTemplate from "../../../../../../../component/templates/admin/AdminOrUserTemplate";
import ArrowBack from "../../../../../../../component/modules/ArrowBack";
import { enumRoutes } from "../../../../../../../context/AppReducer";

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function TransaksiSantri() {
  const router = useRouter();
  const { donasi_id } = router.query;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const {
    data: transactions,
    error,
    mutate,
  } = useSWR(
    router.isReady
      ? `/admin/transaction?page=${page - 1}&n=${entries}&id=${donasi_id}`
      : null,
    fetcher
  );

  const changeStatus = async (ids, status) => {
    return axiosMain.post(`/admin/transaction/status?id=${ids}`, {
      status: `${status}`,
    });
  };

  const TableViewSantriTransaksi = (
    <TableView
      data={transactions}
      santriormarkaz="transaksi"
      titleTwo="ID Transaksi"
      titleThree="Nominal Donasi"
      titleFour="Status"
      apiCall={changeStatus}
      mutate={mutate}
      dialogType="statusTransaksi"
    />
  );

  const { santri_id } = router.query;
  if (error)
    return "An error has occurred. Please re-login or try again later.";
  if (!transactions) return "Loading...";
  return (
    <>
      <ArrowBack href={`${enumRoutes.ADMIN_SANTRI}/${santri_id}/donasi`} />
      <AdminOrUserTemplate
        isAdmin
        disableSearch
        variant="transaksi"
        TableView={TableViewSantriTransaksi}
        data={transactions}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
      />
    </>
  );
}
