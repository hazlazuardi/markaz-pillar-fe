import { useState, useEffect } from "react";
import TableView from "../../../../../component/templates/admin/TableView";
import { axiosMain } from "../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import AdminOrUserTemplate from "../../../../../component/templates/admin/AdminOrUserTemplate";
import ArrowBack from "../../../../../component/modules/ArrowBack";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function DonasiMarkaz() {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: allMarkaz, error } = useSWR(
    `/admin/donation/markaz?id=${id}&page=${page - 1}&n=${entries}`,
    fetcher
  );

  const [iddonasi, setId] = useState();

  useEffect(() => {
    setId(router.query.id);
  }, [router]);

  const TableViewMarkazDonasi = (
    <TableView
      data={allMarkaz}
      santriormarkaz="donasi"
      detail="admin/markaz"
      tableTempatMarkaz="ID Donasi"
      tableDomisili="Nominal Donasi"
      tableJenisKelamin="Jumlah Donasi Terkumpul"
      tableTanggalLahir="Status"
      iddonasi={iddonasi}
    />
  );
  console.log(allMarkaz);
  if (error) return "An error has occurred.";
  if (!allMarkaz) return "Loading...";
  return (
    <>
      <ArrowBack href="/admin/markaz" />
      <AdminOrUserTemplate
        isAdmin
        variant="donasi"
        TableView={TableViewMarkazDonasi}
        data={allMarkaz}
        page={page}
        setPage={setPage}
        entries={entries}
        setEntries={setEntries}
        hrefCreate={`/admin/markaz/donasi/create/${id}`}
      />
    </>
  );
}
