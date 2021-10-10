import React from 'react'
import ShowAllTemplate from '../../../component/templates/show_all/ShowAll'
import { useState } from 'react';
import Button from '@mui/material/Button';
import GridView from '../../../component/templates/admin/admin-grid';
import TableView from '../../../component/templates/admin/admin-table';

const BASE_URL = process.env.BACKEND_HOST;

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${BASE_URL}/santri/search?sortedAge=DESC`)
    const data = await res.json()

    return {
      props: { responseUsers: data }, // will be passed to the page component as props
    }

  } catch {
    return {
      notFound: true,
    }

  }
}
export default function AdminSantri(props) {
  const { responseUsers } = props
  console.log('res', responseUsers)
  const [gridView, setGridView] = useState(true)
  const notFound = false;
  try {
    notFound = props.notFound
  } catch {
    console.log(responseUsers)
  }


  const gridview = (<Button style={{ color: "#004f5d", backgroundColor: "#ffffff", fontWeight: "bold", textDecoration: "underline" }} onClick={() => setGridView(true)}>Grid View</Button>)
  const tableview = (<Button style={{ color: "#004f5d", backgroundColor: "#ffffff", fontWeight: "bold", textDecoration: "underline" }} onClick={() => setGridView(false)}>Table View</Button>)


  return (
    <ShowAllTemplate searchBarName="Cari Santri" view1={gridview} view2={tableview}>
      <div>
        {gridView ? <GridView data={responseUsers} /> : <TableView data={responseUsers} />}
      </div>

    </ShowAllTemplate>
  )
}
