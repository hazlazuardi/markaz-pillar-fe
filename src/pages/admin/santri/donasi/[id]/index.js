import { useState, useEffect } from "react";
import TableView from "../../../../../component/templates/admin/TableView";
import { axiosMain } from "../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import AdminOrUserTemplate from "../../../../../component/templates/admin/AdminOrUserTemplate";
import ArrowBack from "../../../../../component/modules/ArrowBack";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function DonasiSantri() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: allSantri, error } = useSWR(
    `/admin/donation/santri?id=${id}&page=${page - 1}&n=${entries}`,
    fetcher
  );

  const [iddonasi, setId] = useState();

  useEffect(() => {
    setId(router.query.id);
  }, [router]);

  const TableViewSantriDonasi = (
    <TableView
      data={allSantri}
      santriormarkaz="donasi"
      detail="admin/santri"
      tableTempatMarkaz="ID Donasi"
      tableDomisili="Nominal Donasi"
      tableJenisKelamin="Jumlah Donasi Terkumpul"
      tableTanggalLahir="Status"
      isDonasi
      iddonasi={iddonasi}
    />
  );
  if (error) {
    console.log(error.response);
    return "An error has occurred.";
  }
  if (!allSantri) return "Loading...";
  return (
    <>
      <ArrowBack href="/admin/santri" />
      <AdminOrUserTemplate
        isAdmin
        variant="donasi"
        TableView={TableViewSantriDonasi}
        data={allSantri}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
        hrefCreate={`/admin/santri/donasi/create/${id}`}
      />
    </>
  );
}
