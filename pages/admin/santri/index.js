import React from 'react'
import ShowAllTemplate from '../../../component/templates/show_all/ShowAll'
import { useState } from 'react';
import Grid from '../../../component/templates/admin/admin-grid'
import Table from '../../../component/templates/admin/admin-table'

export default function admin_data_santri_all() {
    return (
        <ShowAllTemplate searchBarName="Cari Santri">
            <Grid />
            <Table />
        </ShowAllTemplate>
    )
}
