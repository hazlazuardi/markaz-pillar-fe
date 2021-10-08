import React from 'react'
import ShowAllTemplate from '../component/templates/show_all/ShowAll'
// import Layout from "../../component/layout"
import Card from '../component/modules/Card';
import { useState } from 'react';
import TableData from '../component/modules/TableData'

export default function admin_data_santri_all() {
    return (
        // <Layout>
            <ShowAllTemplate searchBarName="Cari Santri">
                <TableData />
            </ShowAllTemplate>
        // </Layout>
    )
}
