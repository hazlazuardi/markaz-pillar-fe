import React from 'react'
import ShowAllTemplate from '../component/templates/show_all/ShowAll'
// import Layout from "../../component/layout"
import Card from '../component/modules/Card';
import { useState } from 'react';
import TableData from '../component/modules/TableData'
import TableDataRow from '../component/modules/TableDataRow'


// const action = <Button variant="outlined">Primary</Button>;

export default function admin_data_santri_all() {
    return (
        // <Layout>
            <ShowAllTemplate searchBarName="Cari Santri">
                <TableData>
                     <TableDataRow nama = "test" markaz = "test" domisili = "test" kelamin = "test" tanggal = "test" />
                     <TableDataRow nama = "test" markaz = "test" domisili = "test" kelamin = "test" tanggal = "test" />
                     <TableDataRow nama = "test" markaz = "test" domisili = "test" kelamin = "test" tanggal = "test" />
                </TableData>
            </ShowAllTemplate>
        // </Layout>
    )
}
