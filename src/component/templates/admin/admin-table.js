import React from "react";
// import Layout from "../../component/layout"
import TableData from "../../modules/TableData";
import TableDataRow from "../../modules/TableDataRow";

// const action = <Button variant="outlined">Primary</Button>;

export default function TableView(props) {
  const { data, santriormarkaz } = props;
  // array of objects
  const users = data.result;
  console.log(data.result);

  return (
    <TableData>
      {users.map((user) => (
        <TableDataRow
          key={user.id}
          id={user.id}
          nama={user.name}
          markaz=""
          domisili={user.birthPlace}
          kelamin={user.gender}
          tanggal={user.birthDate}
          santriormarkaz={santriormarkaz}
        />
      ))}
    </TableData>
  );
}
