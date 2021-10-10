import React from 'react'
// import Layout from "../../component/layout"
import TableData from '../../modules/TableData'
import TableDataRow from '../../modules/TableDataRow'


// const action = <Button variant="outlined">Primary</Button>;

export default function TableView() {
    return (
        <TableData>
            <TableDataRow nama = "test" markaz = "test" domisili = "test" kelamin = "test" tanggal = "test" />
            <TableDataRow nama = "test" markaz = "test" domisili = "test" kelamin = "test" tanggal = "test" />
            <TableDataRow nama = "test" markaz = "test" domisili = "test" kelamin = "test" tanggal = "test" />
            <TableDataRow nama = "test" markaz = "test" domisili = "test" kelamin = "test" tanggal = "test" />
        </TableData>
    )
}
