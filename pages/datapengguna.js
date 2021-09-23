import Table from 'react-bootstrap/Table'
import Layout from "../component/layout"
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Search from "../component/searchbar"

export default function DataPengguna() {
    return (
    <Layout>
        <div className={styles.container}>
            <div className={styles.gridnav}>
                <p className={[styles.sub, styles.item1].join(" ")}><b>DATA PENGGUNA</b></p>
                <Search className={styles.item3}/>
            </div>
            <Table striped bordered hover>
              <thead className={styles.tablehead}>
                <tr>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Nomor Telepon</th>
                  <th>Alamat</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.sub}><u><b>Roni Wijaya</b></u></td>
                  <td>@roniwijaya</td>
                  <td>roniwijaya@gmail.com</td>
                  <td>+6212345678</td>
                  <td>Kampus UI, Jalan Margonda Raya, Pondok Cina, Beji, Pondok Cina, Kecamatan Beji, Kota Depok, Jawa Barat 16424</td>
                  <td>
                    <button>
                        <Link href='/datapengguna-edit'>
                         <a className={styles.navlink}>Edit</a>
                        </Link>
                    </button>
                    <button>
                         <a className={styles.navlink}>Delete</a>
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
        </div>
    </Layout>
    )
}