import React from "react";
// import Layout from "../../component/layout"
import TableData from "../../modules/TableData";
import TableDataRow from "../../modules/TableDataRow";
import Link from "@mui/material/Link";

// const action = <Button variant="outlined">Primary</Button>;

export default function TableView(props) {
  const {
    data,
    santriormarkaz,
    detail,
    tableTempatMarkaz,
    tableDomisili,
    tableJenisKelamin,
    tableTanggalLahir,
  } = props;
  // array of objects
  const users = data.result;
  

  return (
    <TableData
      tableTempatMarkaz={tableTempatMarkaz}
      tableDomisili={tableDomisili}
      tableJenisKelamin={tableJenisKelamin}
      tableTanggalLahir={tableTanggalLahir}
    >
      {users.map((user) => (
        <TableDataRow
          key={user.id}
          id={user.id}
          nama={user.name}
          markaz={
            santriormarkaz === "santri" ? user.markaz.name : user.category
          }
          domisili={
            santriormarkaz === "santri" ? user.birthPlace : user.nominal
          }
          kelamin={
            santriormarkaz === "santri" ? user.gender : user.contactPerson
          }
          tanggal={santriormarkaz === "santri" ? user.birthDate : "Wisnu"}
          santriormarkaz={santriormarkaz}
          detail={detail}
        />
      ))}
    </TableData>
  );
}
