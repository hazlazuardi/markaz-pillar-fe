import { useState } from "react";
import TableView from "../../../../../component/templates/admin/TableView";
import { axiosMain } from "../../../../../axiosInstances";
import useSWR from "swr";
import { useRouter } from "next/router";
import AdminOrUserTemplate from "../../../../../component/templates/admin/AdminOrUserTemplate";
import ArrowBack from "../../../../../component/modules/ArrowBack";

const fetcher = (url) => axiosMain.get(url).then((res) => res.data);

export default function DonasiMarkaz(props) {
  const router = useRouter();
  const { id } = router.query;
  const [searchDonasiMarkaz, setSearchDonasiMarkaz] = useState("")
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState(10);
  const { data: responseDonasiMarkaz, error } = useSWR(router.isReady ? 
    `/admin/donation/markaz?id=${id}&page=${page - 1}&n=${entries}&${!!searchDonasiMarkaz && "s=" + searchDonasiMarkaz}` : null,
    fetcher,
  );


  const TableViewMarkazDonasi = (
    <TableView
      data={responseDonasiMarkaz}
      santriormarkaz="donasi"
      detail="admin/markaz"
      tableTempatMarkaz="ID Donasi"
      tableDomisili="Nominal Donasi"
      tableJenisKelamin="Jumlah Donasi Terkumpul"
      tableTanggalLahir="Status"
      isDonasi
      iddonasi={id}
    />
  );
  
  if (error) return "An error has occurred.";
  return (
    <>
      <ArrowBack href={"/admin/markaz/"+id} />
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
        hrefCreate={`/admin/markaz/donasi/create/${id}`}
      />
    </>
  );
}
