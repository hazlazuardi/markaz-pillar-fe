import React from 'react'
import ShowAllTemplate from '../../../component/templates/show_all/ShowAll'
import { useState } from 'react';
import Grid from '../../../component/templates/admin/admin-grid'
import Table from '../../../component/templates/admin/admin-table'
import Button from '@mui/material/Button';

export default function admin_data_santri_all() {

    const [View, setView] = useState(Grid)

    function setTable(){
        setView(Table)
    }

    function setGrid(){
        setView(Grid)
    }

    const gridview = (<Button style={{ color: "#004f5d", backgroundColor: "#ffffff", fontWeight: "bold", textDecoration: "underline" }} onClick = {setGrid}>Grid View</Button>)
    const tableview = (<Button style={{ color: "#004f5d", backgroundColor: "#ffffff", fontWeight: "bold", textDecoration: "underline" }} onClick = {setTable}>Table View</Button>)
    

    return (
        <ShowAllTemplate searchBarName="Cari Santri" view1={gridview} view2={tableview}>
            <div>
                {View}
            </div>
        
        </ShowAllTemplate>
    )
}
